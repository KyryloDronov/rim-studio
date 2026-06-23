# Fix Connect To Stake button

Задача: кнопка **Connect To Stake** открывает подключение кошелька (не disabled).

**Файл:** только `src/components/stake/StakeContent.jsx`

---

## В чём был баг

```javascript
// REMOVE: кнопка disabled когда !isConnected — кликнуть нельзя
disabled={!(isConnected && !(stakeLoading || approveLoading || isConfirmed))}
```

---

## 1. Import — ADD

**Где:** после `react-toastify`

```javascript
import { useConnectModal } from "@rainbow-me/rainbowkit"; // NEW
```

---

## 2. Hook — ADD

**Где:** после `useAccount()`

```javascript
const { isConnected, address } = useAccount();
const { openConnectModal } = useConnectModal(); // NEW
```

---

## 3. Кнопка `.create_miner_btn` — CHANGE

**REMOVE** — старый `disabled`:

```javascript
// REMOVE
disabled={
  !(isConnected && !(stakeLoading || approveLoading || isConfirmed))
}
```

**REMOVE** — старый `onClick` (сразу stakeWrite):

```javascript
// REMOVE
onClick={() => {
  stakeAmplifier && stakeAmplifier > 0
    ? aproveAndWrite()
    : stakeWrite({ from: address });
}}
```

**REMOVE** — старый текст:

```javascript
// REMOVE
{isConnected ? "Start Stake" : "Connect To Start Stake"}
```

**ADD** — финальный блок кнопки:

```javascript
<div className="create_miner_btn">
  <button
    disabled={
      isConnected &&
      (stakeLoading || approveLoading || isConfirmed)
    }
    onClick={() => {
      if (!isConnected) {
        openConnectModal?.(); // NEW: модалка RainbowKit
        return;
      }
      stakeAmplifier && stakeAmplifier > 0
        ? aproveAndWrite()
        : stakeWrite({ from: address });
    }}
  >
    {isConnected ? "Start Stake" : "Connect To Stake"}
  </button>
</div>
```

---

## Не трогаем

- `Header.jsx` (Connect уже есть в шапке)
- стили, `StakeCount`, wagmi config

---

## Проверка

| Состояние | Кнопка | Действие |
|-----------|--------|----------|
| кошелёк не подключён | **Connect To Stake**, активна | открывает модалку кошелька |
| кошелёк подключён | **Start Stake**, активна | `startStake` / approve |
| идёт транзакция | **Start Stake**, disabled | — |

# Fix Max Button → 250

Задача: кнопка **MAX** у поля **Stake Length** ставит **250** (не 830).

---

## 1. `src/const/const.js`

**Где:** после адресов, перед `calculatePrice`

```javascript
// NEW: значение для кнопки MAX на Stake Length
export const STAKE_LENGTH_MAX_BUTTON_VALUE = 250;
```

---

## 2. `src/common/stakecount/StakeCount.jsx`

**Props — добавить поле:**

```javascript
const StakeCount = ({
  title,
  max,
  min,
  active,
  tooltip,
  onChangeHandler,
  type,
  checksuccess,
  maxClickValue, // NEW: optional — своё значение для MAX (если не передали, берётся max)
}) => {
```

**Функция MAX — заменить целиком:**

```javascript
// CHANGED: если передан maxClickValue — используем его, иначе max (баланс / 830 / 20)
const maxButtonClicked = () => {
  setCheckSuccess(false);
  setInputValue(maxClickValue ?? max);
};
```

**Кнопка MAX — заменить onClick:**

```javascript
{active == 1 && (
  // CHANGED: onClick={maxButtonClicked} вместо () => maxButtonClicked(max)
  <button className="max_button" onClick={maxButtonClicked}>
    MAX
  </button>
)}
```

---

## 3. `src/components/stake/StakeContent.jsx`

**Import — добавить константу:**

```javascript
import {
  HeliosAddress,
  etherToFixed,
  TitanxAddress,
  BuyandburnAddress,
  STAKE_LENGTH_MAX_BUTTON_VALUE, // NEW
} from "../../const/const";
```

**Только блок Stake Length — добавить один prop:**

```javascript
<StakeCount
  checksuccess={checkSuccess}
  title="Stake Length"           // ← это поле меняем
  onChangeHandler={onChangeHandler}
  type="stakeLength"
  active="1"
  max="830"                        // лимит input, без изменений
  min="30"
  maxClickValue={STAKE_LENGTH_MAX_BUTTON_VALUE} // NEW: MAX → 250
  tooltip={...}
/>
```

**Stake Amount** и **Burn Amplifier** — без изменений.

---

## Проверка

`/stake` → **Stake Length** → MAX → input = **250**

| Поле | MAX |
|------|-----|
| Stake Amount | баланс HLX |
| **Stake Length** | **250** |
| Burn Amplifier | 20 |

# Fix Styling — input + MAX button (Stake)

Задача: input и кнопка **MAX** визуально выровнены, текст в input чёрный.

**Файлы:** только Stake — `StakeCount.jsx` + `StakeCount.style.js`

---

## 1. `src/common/stakecount/StakeCount.jsx`

**Где:** return, блок `.miner-container`

**REMOVE** — input и кнопка лежат отдельно в `.miner-container`:

```javascript
// REMOVE: input и MAX как соседи без обёртки
<input className="count_input" ... />
{active == 1 && (
  <button className="max_button" onClick={maxButtonClicked}>MAX</button>
)}
```

**ADD** — обёртка `.input_button_group`:

```javascript
// NEW: группа input + MAX в одной flex-строке
<div className="input_button_group">
  <input
    type="number"
    className="count_input"
    min={min}
    max={max}
    step="1"
    value={inputValue}
    onChange={handleInputChange}
    onKeyDown={handleKeyDown}
  />
  {active == 1 && (
    <button className="max_button" onClick={maxButtonClicked}>
      MAX
    </button>
  )}
</div>
```

---

## 2. `src/common/stakecount/StakeCount.style.js`

### ADD — новый блок `.input_button_group`

**Где:** внутри `.miner-container`, перед `.max_button`

```javascript
// NEW: выравнивание input и MAX по центру
.input_button_group {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}
```

### CHANGE — `.max_button`

**REMOVE:**

```javascript
// REMOVE
padding-top: 9px;
padding-bottom: 9px;
```

**ADD / заменить блок целиком:**

```javascript
.max_button {
    width: 60px;
    height: 38px;              // NEW: та же высота что у input
    padding: 0;                // CHANGED: было padding-top/bottom 9px
    box-sizing: border-box;    // NEW
    display: inline-flex;      // NEW
    align-items: center;       // NEW
    justify-content: center;   // NEW
    background-color: #BA3505;
    border: 1px solid #FE9C01;
    border-radius: 30px;
    font-weight: bold;
    font-size: 14px;           // NEW
    color: white;
    cursor: pointer;
}
```

### CHANGE — `.count_input`

**REMOVE:**

```javascript
// REMOVE
width: 17%;
margin-right: 1%;
height: 15px;
padding: 10px;
border-radius: 5px;
```

**ADD / заменить блок целиком:**

```javascript
.count_input {
    width: 80px;               // CHANGED: было 17%
    height: 38px;              // CHANGED: было 15px + padding 10px
    padding: 0 10px;           // CHANGED
    box-sizing: border-box;    // NEW
    border: 2px solid #fff;
    border-radius: 8px;        // CHANGED: было 5px
    outline: none;
    font-size: 16px;
    color: #000;               // NEW: чёрный текст (был белый от родителя)
    background-color: #fff;    // NEW: белый фон
    transition: border-color 0.3s ease;
}
```

`.count_input:focus` — **без изменений**.

---

## Не трогаем

- `Count.jsx` / `Count.style.js` (Mine)
- `StakeContent.jsx`
- `const.js`

---

## Проверка

`/stake` → все три строки StakeCount:

- input и MAX **одной высоты**, на одной линии
- текст в input **чёрный** на белом фоне
- кнопка MAX — pill, цвета проекта (#BA3505 / #FE9C01)

import { useState } from "react";

import "./App.css";

function App() {
  const [expense, setexpense] = useState([]);

  console.log(Boolean(function () {}));
  console.log(Boolean(-1));
  console.log(Boolean(-0));
  function addExpense(expense) {
    setexpense((item) => [...item, expense]);
  }

  function removeItem(id) {
    const response = confirm("Do You want to deleted item from the  list");
    response ? setexpense(expense.filter((item) => item.id !== id)) : "";
  }
  function handleClear() {
    const response = confirm("Do You want to clear the Expensen list");

    response ? setexpense([]) : "";
  }

  return (
    <>
      <Nav text="Expense Tracker" />

      <div className="wrapper">
        <main className="container">
          <Form handleExpense={addExpense} expense={expense} />
          <Itemcount expense={expense} />
          <Expenselist
            expense={expense}
            removeItem={removeItem}
            handleClear={handleClear}
          />
        </main>
      </div>
      <Footer />
    </>
  );
}

function Nav({ text }) {
  return (
    <>
      <header className="headnav">
        <h1 className="Header">{text}</h1>
      </header>
    </>
  );
}
function Footer() {
  return (
    <>
      <footer className="footer">© 2024 The Programmer's University</footer>
    </>
  );
}

function Form({ handleExpense, expense }) {
  const [iname, setiname] = useState("");
  const [amount, setamount] = useState(0);
  const [date, setdate] = useState("");

  const checkexist = expense.find((item) => item.iname === iname);
  const handleAddItem = (e) => {
    e.preventDefault();

    const inputedItem = { id: Date.now(), iname, amount, date };

    if (iname && amount && date) {
      !checkexist
        ? handleExpense(inputedItem)
        : alert(`${iname} already exist `);
    } else {
      alert(
        `Please fill in the input fields. Missing: ${
          !iname ? "Expense Name" : ""
        } ${!amount ? "amount" : ""} ${!date ? "date" : ""}`
      );
    }

    setamount("");
    setdate("");
    setiname("");
  };
  return (
    <>
      <form action="" className="form" onSubmit={handleAddItem}>
        <h3>Expense name</h3>
        <input
          type="text"
          placeholder="Expense Name..."
          value={iname}
          onChange={(e) => setiname(e.target.value)}
        />
        <h3>Amount</h3>
        <input
          type="number"
          placeholder="$0"
          value={amount}
          onChange={(e) => setamount(e.target.value)}
        />
        <h3>Date</h3>
        <input
          type="date"
          id="expenseDateEl"
          value={date}
          onChange={(e) => setdate(e.target.value)}
        />
      </form>
      <button className="addbtn" onClick={handleAddItem}>
        Add Expense
      </button>
    </>
  );
}

function Sortitem({ expense }) {
  return (
    <>
      <div className="orderandCLear">
        <div className="#">
          <select
            name="sort"
            id="sortEl"
            value={selectoption}
            onChange={(e) => setselection(e.target.value)}
          >
            <option value="initialorder">Input Order</option>
            <option value="accend">A-Z</option>
            <option value="decent">Z-A</option>
            <option value="lowtohigh">Low to high</option>
            <option value="hightolow">High to low</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Filter expense..."
            id="filterexpense"
          />
        </div>
        <div>
          <button id="wipeLocalrage">Clear List</button>
        </div>
      </div>
    </>
  );
}

function Itemcount({ expense }) {
  const itemcount = expense.length;
  const total = expense.reduce((sum, item) => sum + Number(item.amount), 0);
  return (
    <>
      <div className="ExpenseSummary">
        <div>
          <span className="itemCounttitle">Total items:{itemcount} </span>
          <span id="itemCount"></span>
        </div>

        <div>
          <span className="totalExpensetitle">Total Expense: {total} </span>
          <span id="totalExpense"> </span>
        </div>
      </div>
    </>
  );
}

function Expenselist({ expense, removeItem, handleClear }) {
  const [selectoption, setselection] = useState("");
  const [searchitem, setsearchitem] = useState("");
  console.log(searchitem);

  let sortorder = [...expense];

  if (searchitem) {
    sortorder = sortorder.filter((item) =>
      item.iname.toLowerCase().includes(searchitem.toLowerCase())
    );
  } else if (selectoption === "initialorder") {
    sortorder;
  } else if (selectoption === "accend") {
    sortorder.sort((a, b) => a.iname.localeCompare(b.iname));
  } else if (selectoption === "decent") {
    sortorder.sort((a, b) => b.iname.localeCompare(a.iname));
  } else if (selectoption === "lowtohigh") {
    sortorder.sort((a, b) => a.amount - b.amount);
  } else if (selectoption === "hightolow") {
    sortorder.sort((a, b) => b.amount - a.amount);
  }
  return (
    <>
      <h2 className="expenseTitle">Expenses</h2>
      <div className="expenseListContainer">
        <ul className="listExpense" id="expenseListEl">
          {sortorder.map((item) => (
            <Item
              iname={item.iname}
              id={item.id}
              date={item.date}
              amount={item.amount}
              key={item.id}
              removeItem={removeItem}
            />
          ))}
        </ul>
      </div>

      <div className="orderandCLear">
        <div className="#">
          <select
            name="sort"
            id="sortEl"
            value={selectoption}
            onChange={(e) => setselection(e.target.value)}
          >
            <option value="initialorder">Input Order</option>
            <option value="accend">A-Z</option>
            <option value="decent">Z-A</option>
            <option value="lowtohigh">Low to high</option>
            <option value="hightolow">High to low</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Filter expense..."
            id="filterexpense"
            value={searchitem}
            onChange={(e) => setsearchitem(e.target.value)}
          />
        </div>
        <div>
          <button
            id="wipeLocalrage"
            onClick={() => {
              handleClear();
            }}
          >
            Clear List
          </button>
        </div>
      </div>
    </>
  );
}

function Item({ onclick, expense, iname, amount, date, id, removeItem }) {
  return (
    <>
      <li key={id}>
        {iname} - $ {amount} - {date}
        <button className="del" onClick={() => removeItem(id)}>
          delete
        </button>
      </li>
    </>
  );
}
export default App;

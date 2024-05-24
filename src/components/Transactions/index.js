import {useEffect, useState} from 'react'
import axios from 'axios'
import Statistics from '../Statistics'
import BarChartComponent from '../BarChart'
import './index.css'

const months = [
  {
    name: 'January',
  },
  {
    name: 'February',
  },
  {
    name: 'March',
  },
  {
    name: 'April',
  },
  {
    name: 'May',
  },
  {
    name: 'June',
  },
  {
    name: 'July',
  },
  {
    name: 'August',
  },
  {
    name: 'September',
  },
  {
    name: 'October',
  },
  {
    name: 'November',
  },
  {
    name: 'December',
  },
]

const Transactions = () => {
  const [transactionList, setTransactionList] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(months[2].name)
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const getTransactions = async () => {
      const response = await axios.get(
        `https://roxiler-backend-vijaykumars-projects.vercel.app/transactions?month=${selectedMonth}&page=${page}&search=${searchInput}&perPage=10`,
      )
      if (response) {
        console.log(response)
        setTransactionList(response.data.transactions)
      }
    }
    getTransactions()
  }, [page, searchInput, selectedMonth])

  const handleNextPage = () => {
    setPage(prevValue => prevValue + 1)
  }

  const handlePrevPage = () => {
    setPage(prevValue => (prevValue > 1 ? prevValue - 1 : prevValue))
  }

  return (
    <div className="main-container">
      <div className="first-container">
        <h3 width="20px">Transaction Dashboard</h3>
      </div>
      <div className="second-container">
        <input
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="input-element"
          type="search"
          placeholder="Search transaction"
        />
        <select
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="dropdown-list"
        >
          {months.map(o => (
            <option className="selector-element" key={o.name} value={o.name}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactionList.map(o => {
            const {
              category,
              // dateOfSale,
              description,
              id,
              image,
              price,
              sold,
              title,
            } = o
            return (
              <tr key={o.id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>{description}</td>
                <td>{price}</td>
                <td>{category}</td>
                <td>{sold}</td>
                <td>
                  {' '}
                  <img src={image} alt={image} className="images" />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="last-container">
        <p>Page No: {page}</p>
        <div className="next-pre-btn">
          <button
            onClick={handlePrevPage}
            type="button"
            className="previous-button"
          >
            Previous
          </button>
          <p>-</p>
          <button
            onClick={handleNextPage}
            type="button"
            className="next-button"
          >
            Next
          </button>
        </div>
        <p>Per Page: 10</p>
      </div>
      <div className="statistics-container">
        {/* {transactions component} */}
      </div>
      <div className="line">
        <hr />
      </div>
      <Statistics selectedMonth={selectedMonth} />
      <BarChartComponent selectedMonth={selectedMonth} />
    </div>
  )
}

export default Transactions

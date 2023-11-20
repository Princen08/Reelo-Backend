import "./App.css";
import { useState } from 'react'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [totalMarks, setTotalMarks] = useState();
  const [easyPer, setEasyper] = useState();
  const [mediumPer, setMediumper] = useState();
  const [hardPer, setHardper] = useState();
  const [questionList, setQuestionList] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!totalMarks || !easyPer || !mediumPer || !hardPer) {
      toast.error("All fields are mandatory.")
      return;
    }
    if (totalMarks % 5) {
      toast.error("Total marks must be multiple of 5.")
      return;
    }
    let sum = parseInt(easyPer) + parseInt(mediumPer) + parseInt(hardPer);
    if (sum !== 100) {
      toast.error("Sum of difficulty must be 100.");
      return;
    }
    toast.success("Paper generated succesfully.")
    generatePaper();
  };

  async function generatePaper() {
    try {
      const res = await axios.get('https://reelo-backend.vercel.app/',
        {
          params: {
            totalMarks: totalMarks,
            easyPer: easyPer / 100,
            mediumPer: mediumPer / 100,
            hardPer: hardPer / 100
          },
        }
      );
      setQuestionList(res.data.questionList)
    } catch (err) {
      return err;
    }
  }
  return (

    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <h1 className=" text-3xl font-bold px-5 py-5 text-blue-400">
        Question Paper Generator
      </h1>
      <form>
        <div className="flex">
          <label
            htmlFor="totalMarks"
            className="mx-4 block text-sm font-medium leading-6 text-gray-900"
          >
            Total Marks
          </label>
          <input
            type="number"
            name="totalMarks"
            id="totalMarks"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            className="mx-4 remove-arrow block w-3/12 rounded-md border-2 border-black py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            placeholder="Enter Total Marks"
            required
          />
          <label
            htmlFor="easyPer"
            className="mx-4 block text-sm font-medium leading-6 text-gray-900"
          >
            Easy (%)
          </label>
          <input
            type="number"
            name="easyPer"
            id="easyPer"
            value={easyPer}
            onChange={(e) => setEasyper(e.target.value)}
            className="mx-4 remove-arrow block w-3/12 rounded-md border-2 border-black py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            placeholder="Enter Percentage"
            required
          />
          <label
            htmlFor="mediumPer"
            className="mx-4 block text-sm font-medium leading-6 text-gray-900"
          >
            Medium (%)
          </label>
          <input
            type="number"
            name="mediumPer"
            id="mediumPer"
            value={mediumPer}
            onChange={(e) => setMediumper(e.target.value)}
            className="mx-4 remove-arrow block w-3/12 rounded-md border-2 border-black py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            placeholder="Enter Percentage"
            required
          />
          <label
            htmlFor="hardPer"
            className="mx-4 block text-sm font-medium leading-6 text-gray-900"
          >
            Hard (%)
          </label>
          <input
            type="number"
            name="hardPer"
            id="hardPer"
            value={hardPer}
            onChange={(e) => setHardper(e.target.value)}
            className="mx-4 remove-arrow block w-3/12 rounded-md border-2 border-black py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6"
            placeholder="Enter Percentage"
            required
          />
        </div>
        <div className="mt-5 mx-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >Generate</button>
        </div>
      </form>
      <table class="mt-10 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 w-1/12">
              Sr. No
            </th>
            <th scope="col" class="px-6 py-3  w-1/2">
              Question
            </th>
            <th scope="col" class="px-6 py-3 w-3/12">
              Subject
            </th>
            <th scope="col" class="px-6 py-3 w-3/12">
              Marks
            </th>
          </tr>
        </thead>
        {questionList &&
          questionList.map((item, index) => (
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class=" px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td class="px-6 py-4 text-black">
                  {item.question}
                </td>
                <td class="px-6 py-4 text-black">
                  {item.subject}
                </td>
                <td class="px-6 py-4 text-black">
                  {item.marks}
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
}

export default App;

import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import BaseLayout from "@/components/layouts/BaseLayout";
import BaseContainer from "@/components/layouts/BaseContainer";
import Input from "@/components/form-elements/Input";
import TextArea from "@/components/form-elements/TextArea";
import axios from "axios";
import { useRouter } from 'next/router';
import Modal from "@/components/modal";
import formatDate from "@/components/formatDate";



export default function GetOne() {

  // const vatAmount = 170 + 10 + 170 + 170 * 0.025;
  const totalAmount = '19200';
  const router = useRouter();
 

	const [modal, setModal] = useState(false);
	const [output, setOutput] = useState({});
  const [dated, setDate] = useState({});
	const [outputEach, setOutputEach] = useState({});

  const [inputValue, setInputValue] = useState([]);
  const handleSubmit = async () => {
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sk_test_33445a56c5bfe1219cebcfd0efb3910b10e774db'
    
    }
    try {
     const allData = await  axios.get('https://api.paystack.co/transaction',  {
        headers
      })
      const myData= allData.data;
      setInputValue(myData);
      const { data } = allData;
      setOutput(data.data)
      console.log( myData, myData.meta.total,myData.message, myData.data, 'i am payload work')
      console.log( data, output.id, 'i am key info')
    } catch (error) {
        throw error
      }
      };
    const getIndividual = async (id) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk_test_33445a56c5bfe1219cebcfd0efb3910b10e774db'
      
      }
    const myEachData=  await axios.get(`https://api.paystack.co/transaction/${id}`,  {
        headers
      })
      setOutputEach(myEachData.data.data)
      setModal(true)
      const date = new Date(myEachData.data.data.createdAt);
      // const formattedDate = date.toLocaleString();
     const formattedDate = date.toLocaleString('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });;
      setDate(formattedDate)
      console.log(myEachData, myEachData.data.data.createdAt, 'i am a working each data')
    }
  return (
    <>

    {/* View Individual Transaction modal */}
      {modal && 
    <div className="modal fade fixed  w-[500px] mx-[auto]  h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModalCenteredScrollable" tabindex="-1" aria-labelledby="exampleModalCenteredScrollable" aria-modal="true" role="dialog">
    <div className="">
      <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
          <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalCenteredScrollableLabel">
          {outputEach.id} Transaction
          </h5>
          <button type="button"
            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        {/* <formatDat /> */}
        <div className="modal-body relative p-4">
          <p >
            This transaction was carried out on {dated}
            and the amount was {outputEach.currency} {outputEach.amount} with status <span  className={`  ${
            outputEach.status == 'success'
              ? "text-[#137C4B]"
             : "text-[red] "
          }`}>{outputEach.status}</span> using {outputEach.channel}.
          </p>
    
        </div>
        <div
          className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
          <button type="button"
            className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            data-bs-dismiss="modal"
            onClick={()=>setModal(!modal)}>
            Close
          </button>
          
        </div>
      </div>
    </div>
  </div>
      }
      {/* RGet  All transaction Page */}
      <section className=" bg-[#fbfbfb] h-[auto] min-h-[80vh] flex flex-col  p-[2rem]">
        
        <button className="w-[250px] btn-primary" onClick={handleSubmit}> Get All</button>
       <p> Please click on get all to retrieve all transactions then click on view to get individual transactions</p>
       <p>All transaction available  {inputValue?.meta?.total}</p>
       <div className="w-[100%] overflow-x-scroll scroll_hide">
        <table className=" w-full  border-gray-lighter border-collapse">
        <thead className="text-bl text-black-light whitespace-nowrap bg-gray-lightest-2 caption_heavy h-[48px] font-medium">
            <tr>
              <th className="border-b border-r border-gray-lighter font-medium text-left pt-[10px] px-[16px] ">
                <span className=" align-text-bottom mt-auto subheader_light">ID</span>
              </th>
              <th className="border-b border-r border-gray-lighter font-medium text-left pt-[10px] px-[16px] ">
                <span className=" align-text-bottom mt-auto subheader_light"> Status</span>
              </th>
              <th className="border-b border-r border-gray-lighter font-medium text-left pt-[10px] px-[16px] ">
                <span className=" align-text-bottom mt-auto subheader_light"> Amount</span>
              </th>
              <th className="border-b border-r border-gray-lighter font-medium text-left pt-[10px] px-[16px]">
                <span className=" align-text-bottom mt-auto subheader_light">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="text-[#666668] whitespace-nowrap !gap-8  ">
          {output.length > 0
          ? output.map((item, index) => (
            <tr  key={index} className="h-[52px] px-[0.4rem]">
              <td className="px-[16px] text-left border-r border-b ">
                <p className="h-full flex body_light text-gray-dark items-center">{item.id}</p>
              </td>

              <td className="px-[16px] text-left border-r border-b ">
              { item.status === 'success' ?
                <p className="body_light text-green-400">{item.status}</p>
                :
                <p className="body_light text-red-400">{item.status}</p>
               
              } </td>
              <td className="px-[16px] text-left border-r border-b ">
              <p className="text-black body_light">{item.currency} <span className="!text-[#7c7b7b] body_light">{item.amount}</span></p>
              </td>
             <td className="px-[16px] text-left border-b ">
                <p className=" cursor-pointer text-green-900 body_light" onClick={() => getIndividual(item.id)} >View</p>
              </td>
            </tr>
             ))
             : null}
            </tbody>
        </table>
        </div>
      </section>
    </>
  );
}

GetOne.layout = BaseLayout;
// {status:true, message:'success', data: [{0:{id:456, reference:'xyzasdf'}, 1:{id:234, reference:'huawei'}}], meta:{total:211}}
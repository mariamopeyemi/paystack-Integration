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


export default function GetAll() {

	const [output, setOutput] = useState({});

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
      await axios.get(`https://api.paystack.co/transaction/${id}`)
    }
  return (
    <>

      {/* READY WHEN YOU ARE Section */}
      <section className=" bg-[#fbfbfb] h-[auto] min-h-[80vh] flex flex-col  p-[2rem]">

        <button className="w-[250px] btn-primary" onClick={handleSubmit}>Get All</button>
        <p>All transaction available  {inputValue?.meta?.total}</p>
        {/* <p>{inputValue?.message} are {inputValue?.meta?.total}</p> */}
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
                <p className=" cursor-pointer text-green-900 body_light" onClick={getIndividual} >View</p>
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

GetAll.layout = BaseLayout;
// {status:true, message:'success', data: [{0:{id:456, reference:'xyzasdf'}, 1:{id:234, reference:'huawei'}}], meta:{total:211}}
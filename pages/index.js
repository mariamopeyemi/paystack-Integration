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


export default function Home() {

  // const vatAmount = 170 + 10 + 170 + 170 * 0.025;
  const totalAmount = '19200';
  const router = useRouter();
  const validEmail = new RegExp(
		"^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
	);

	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    if (!validEmail.test(email)) {
      setEmailError('Email is required');
      return;
    } else{setEmailError('')} 
    // setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer sk_test_33445a56c5bfe1219cebcfd0efb3910b10e774db'
    
    }
     await  axios.post('https://api.paystack.co/transaction/initialize', {
        amount: totalAmount,
        email: email,
      }, {
        headers
      })

      // console.log(response, email, totalAmount, 'i am payload work')
      .then(function (response) {
        console.log(response);
        console.log(response, email, totalAmount, 'i work', response.data.data.authorization_url)
        router.push(response.data.data.authorization_url)
        
        // setInterval(() => {
        //   router.push('https://opeyemi.dev')
        // }, 5000);
      })
     
      .catch(function (error) {
        console.log(error);

        // toast.error
        alert('An error occured, please try again')
      });
    }

  // const handleVerification = async () => {
  //   // e.preventDefault();
  //  const {reference} = await handleSubmit()
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer sk_test_33445a56c5bfe1219cebcfd0efb3910b10e774db'
    
  //   }
  //   // const reference = response.data.data.reference;
  //    await  axios.get(`https://api.paystack.co/transaction/verify/${reference}`, 
  //      {
  //       headers
  //     })
  //     console.log(reference, 'i am reference', response)
  //    .then(function (response) {
  //       console.log(response);
       
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       // toast.error
  //       alert('An error occured, please try again')
  //     });
  //   }
  return (
    <>

      {/* READY WHEN YOU ARE Section */}
      <section className=" bg-[#fbfbfb] h-[auto] min-h-[80vh] flex flex-col md:flex-row p-[2rem] justify-between">

        <section className="w-[100%] md:w-[65%] ">
          <p className="text-[22px] mb-[2rem]">Your selected product(s)</p>
          <div className="flex flex-row gap-[2rem] justify-between px-[2rem] items-center">
            <img src='/shoe1.jpeg' alt='product1' className="rounded-[10px] w-[150px] h-[100px]" />
            <div className="flex flex-col md:flex-row justify-between md:w-[70%] ">
            <p>Mika Shoe</p>
            <p>₦170</p>
            <div className="flex flex-row gap-[1rem]">
              <p className=" w-[20px] text-center h-[25px] rounded-[4px] bg-[#f2f2f2] cursor-pointer">+</p>
              <p >1</p>
              <p className=" w-[20px] text-center h-[25px] rounded-[4px] bg-[#f2f2f2] cursor-pointer">-</p>
            </div>
            <p className="md:w-[100px]">₦170</p>
            </div>
            
          </div>
          <hr className="mt-[2rem] bg-gradient-to-r from-[green] via-white to-[#a2c4a2]  h-[2px] border-0" />

          {/* <button className=" btn-primary" onClick={handleVerification}>Verify Now</button> */}
        </section>
        <section className="relative w-[100%] md:w-[35%] p-[2rem] flex flex-col gap-[1rem] bg-white ">
          <p className="text-[22px] mb-[2rem] ">Customer details</p>
          <Input type='email' label={"Email"} 
            value={email}
            // placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            
          />
        
          {emailError && <span className="text-[12px] text-end !text-red-500">{emailError}</span>}

          <Input type='text' label={"Address"}
            // value={email}
            // placeholder="Enter your email address"
            // onChange={(e) => setEmail(e.target.value)}
          />
          <TextArea type='text'  label={"Extra Details"} />
         <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <p> Items subtotal</p>
            <p className="font-[200px] text-sm text-[#7f7b7b]">₦170</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Delivery fees</p>
            <p className="font-[200px] text-sm text-[#7f7b7b]">₦10</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>VAT (7.5%)</p>
            <p className="font-[200px] text-sm text-[#7f7b7b]">₦12</p>
          </div>
          <div className="flex flex-row justify-between mt-[2rem]">
            <p>Total</p>
            <p className="">₦ {totalAmount}</p>
          </div>
         </div>
        <button className=" btn-primary" onClick={handleSubmit}>Pay Now</button>
        </section>
        
      </section>
    </>
  );
}

Home.layout = BaseLayout;

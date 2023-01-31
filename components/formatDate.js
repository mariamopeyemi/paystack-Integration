const formatDate = (time, monthName = false) => {
    // var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  
    if (!time) {
      return "No Date Yet";
    }
    // console.log("date is", new Date(time));
    // const formattedDate = `${new Date(time).getDate()} ${monthNames[new Date(time).getUTCMonth()]}, ${new Date(time).getFullYear()}`;
    const formattedDate = monthName
      ? `${new Date(time).getDate()} ${monthNames[new Date(time).getUTCMonth()]}, ${new Date(time).getFullYear()}`
      : `${new Date(time).getDate()}/${new Date(time).getMonth()}/${new Date(time).getFullYear()}`;
    // console.log("formatted date is", formattedDate);
    return formattedDate;
  };
  
  export default formatDate;
  
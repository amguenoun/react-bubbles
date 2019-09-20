import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axiosWithAuth().get(`/api/colors`)
      .then(res => setColorList(res.data))
      .catch(err => console.log('Error: BubblePage: GET: ', err));
  }, [flag])

  const handleFlag = () => {
    setFlag(!flag);
  }

  return (
    <>
      <ColorList colors={colorList} handleFlag={handleFlag} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

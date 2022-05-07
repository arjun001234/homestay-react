import React from "react";
import { Homestay as HomestayType } from "../../redux/reducers/app";

type homestayProps = {
  homestay: HomestayType
}


const Homestay : React.FC<homestayProps> = ({homestay}) => {
  return (
    <section>
      <img src={homestay.img[0]} />
      <div>
        <h1>{homestay.name}</h1>
        <p>{homestay.desc}</p>
        <button>
          <a href={`/homestay/${homestay.id}`}>Book Now</a>
        </button>
      </div>
    </section>
  );
};

export default Homestay;

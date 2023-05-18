import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Input } from 'reactstrap';

// css del datepicker 
import "react-datepicker/dist/react-datepicker.css";


const Fecha = (props) => {
    const [startDate, setStartDate] = useState(props.fecha);
    const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
        <Input
            value={value}
            onClick={onClick}
            onChange={onChange}
            ref={ref}
        ></Input>
    ));


    const cambioFecha = (fecha) => {
        if (fecha == null) {
            props.getFecha("");
            setStartDate("");
            return;
        }
        let day = `${(fecha.getDay())}`.padStart(2, '0');
        let month = `${(fecha.getMonth() + 1)}`.padStart(2, '0');
        let year = fecha.getFullYear();
        props.getFecha(`${day}/${month}/${year}`);
        setStartDate(fecha);
    }
    if (props.fecha === "" && startDate !== "") {
        setStartDate(props.fecha);
    }
    if (startDate !== "" && typeof (startDate) === "string") {
        let [day, month, year] = startDate.split('/')
        const dateObj = new Date(+year, +month - 1, +day)
        setStartDate(dateObj)
    }

    console.log(startDate);
    console.log(typeof (startDate));
    console.log(props.fecha);
    return (
        <DatePicker
            showIcon
            selected={startDate}
            customInput={<ExampleCustomInput />}
            onChange={date => cambioFecha(date)}
            dateFormat="dd/MM/yyyy"
        />
    );

}
export default Fecha;
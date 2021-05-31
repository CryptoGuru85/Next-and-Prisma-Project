import React, { FC, useEffect, useState } from "react";
import "antd/dist/antd.css";
import DoubleDatePicker from "~/components/DoubleDatePicker";
import { useField } from "formik";

const WrapDatePicker = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [field, meta, helpers] = useField(props);

    useEffect(() => {
        const workingTime = {
            from: startDate,
            to: endDate,
        };

        helpers.setValue(workingTime);
    }, [startDate, endDate])

    return (
        <div>
            <DoubleDatePicker setStartDate={setStartDate} setEndDate={setEndDate} />

            <style jsx>{`
            
            `}</style>
        </div>

    );
};

export default WrapDatePicker;
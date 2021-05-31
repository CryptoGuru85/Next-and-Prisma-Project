import React, { FC, useEffect, useState } from "react";
import {Formik, Field, Form, FormikValues} from "formik";
import styles from "./AddressModal.module.css";
import Modal from 'react-modal';
import Button, { ButtonType } from "~/components/Button";
import { useTranslation } from "next-i18next";
import AddressItem from "./AddressItem";
import RadioBoxs from "~/components/RadioBoxs";
import { FetchCityList, FetchCountryList } from "~/redux/actions";
import { useDispatch, useSelector } from "react-redux";

interface AddressModalProps {
  name: string;
  label: string;
  onChange: (value) => void;
}

/**
 * Модальное окно с вводом адреса
 * @param props
 */
const AddressModal: FC<AddressModalProps> = (props:AddressModalProps) => {

  const { t: tEvents } = useTranslation("events");
    
  const {name, label, onChange} = props

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [country, setCountry] = React.useState('');
  const [countrysort, setCountrysort] = useState<any|null>('');
  const [city, setCity] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [buildingHouse, setBuildingHouse] = React.useState('');
  const [officeFlat, setOfficeFlat] = React.useState('');
  const [fullAddress, setFullAddress] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [countryLoading, setCountryLoading] = React.useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state:any)=>state);

  const countryDefaultValue = 6;
  const cityDefaultValue = 0;

  const fetchCityList = () => {
      dispatch(FetchCityList(setLoading));
  };
  useEffect(fetchCityList, []);

  const fetchCountryList = () => {
      dispatch(FetchCountryList(setCountryLoading));
  };
  useEffect(fetchCountryList, []);
   console.log(state);
  const cities =  loading ? [] : state.cityList.map((city, i) => {
    return city.name

  });

  const countries = countryLoading ? [] : state.countryList.map((city, i) => {
    return city.name
  });

  useEffect(() => {
    if (!countryLoading) {
        setCountry(countries[6]);
    }
  }, [countryLoading])

  useEffect(() => {
    if (!loading) {
        setCity(cities[0]);
    }
  }, [loading])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
    let addressValue = '';
    if (country) addressValue += addressValue ? ', ' + country : country;
    if (city) addressValue += addressValue ? ', ' + city : city;
    if (postalCode) addressValue += addressValue ? ', ' + postalCode : postalCode;
    if (street) addressValue += addressValue ? ', ' + street : street;
    if (buildingHouse) addressValue += addressValue ? ', ' + buildingHouse : buildingHouse;
    if (officeFlat) addressValue += addressValue ? ', ' + officeFlat : officeFlat;
    setFullAddress(addressValue);
    onChange(country + ', ' + city + ', ' + postalCode + ', ' + street + ', ' + buildingHouse + ', ' + officeFlat);
  }

  const changeBuildingHouse = (e) => {
    setBuildingHouse(e.target.value);
  }

  const changeOfficeFlat = (result) => {
    setOfficeFlat(result.target.value);
  }

  const changeStreet = (e) => {
    setStreet(e.target.value);
  }

  const changePostalCode = (e) => {
    setPostalCode(e.target.value);
  }

  const changeCountry = (result) => {
    setCountry(result.target.value);
    // console.log("ff",state.cityList);
    let  c,k;
    let list:string[] = [];
    state.countryList.forEach((item,i)=> {
      if(item.name == result.target.value) { c= item.id}
    })
    state.cityList.forEach((item, i)=>{
      if(c == item.country) {list.push(item.name)}
    })
    setCountrysort(list);
/*
   
    console.log("ffffffff", countrysort);
   // setCountrysort(cities.filter((item,i)=>{ name : result.target.value})*/
  }

  const changeCity = (result) => {
    setCity(result.target.value);
  }

  const customStyles = {
    content : {
      transform: 'translate(-50%, -50%)',
    }
  };

  return (
    <div className={styles.inputContainer}>
      <span className={styles.label}>{label}</span>
        <Field
            onClick={openModal}
            name={name}
            className={styles.mainInput}
            value={fullAddress}
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          className={styles.modal}
        >
        <div className={styles.eventContainer}>
            <div className={styles.eventMain}>
                <RadioBoxs onChange={changeCountry} contents={countries} label={tEvents("EVENT_ADDRESS_MODAL_COUNTRY_REGION")} defaultValue={countryDefaultValue} />
                <RadioBoxs onChange={changeCity} contents={countrysort ? countrysort : []} label={tEvents("EVENT_ADDRESS_MODAL_CITY")} defaultValue={cityDefaultValue} />
                <AddressItem onChangeFirst={changePostalCode} onChangeSecond={changeStreet} name="Postal" secondName="Code" label={tEvents("EVENT_ADDRESS_MODAL_POSTAL_CODE")}/>
                <AddressItem onChangeFirst={changeBuildingHouse} onChangeSecond={changeOfficeFlat} name="Buildings" secondName="House" label={tEvents("EVENT_ADDRESS_MODAL_BUILDINGS_HOUSE")}/>
            </div>
            <div className={styles.actions}>
                <div className={styles.actionContainer}>
                    <Button onClick={closeModal} type={ButtonType.Button} danger={false}>{tEvents("EVENT_ACTION_SAVE")}</Button>
                </div>
            </div>
        </div>
        </Modal>
    </div>

  );
};

  export default AddressModal;
import React, { FC, useState } from "react";
import { Field, useField } from "formik";
import Close from "~/public/icons/close.svg";
import Chevron from "~/public/icons/chevron.svg";
import styles from "./OptionMultiSelect.module.css";


enum ActionType {
    None,
    Add,
    Delete,
}

interface SelectionProps {
    option: string[];
    onClick: () => void;
}
export const Selection: FC<SelectionProps> = (props: SelectionProps) => {
    const { onClick, option } = props;

    return (
        <div className={styles.selection} onClick={onClick} key={option[0]}>
            <span>{option[1]}</span>
            <Close />
        </div>
    );
};

interface OptionSelectProps {
    name: string;
    label: string;
    isMulti?: boolean;
    options: Map<string, string>;
    onChange: (id: string, option: string, selected: Map<string, string>) => void;
}

/**
 * Компонент для выбора опций. Может выбирать несколько значений.
 * @param props
 * @constructor
 */
const OptionSelect: FC<OptionSelectProps> = (props: OptionSelectProps) => {
    const { name, label, options, onChange, isMulti } = props;
    const [selected, setSelected] = useState<Map<string, string>>(new Map());

    const [selectedId, setSelectedId] = useState(null);
    // @ts-ignore
    const [field, meta, helpers] = useField(props);

    const onClick = (id: string, option: string, type: ActionType) => {
        
         
        if ( !isMulti ){
            helpers.setValue([option]);
            onChange(id, option, selected);
            setSelectedId(id);
            return;
        } 
        const newSelected: Map<string, string> = new Map(Array.from(selected));
        
        if ( !newSelected.has(id) ) {
            if ( type === ActionType.Add ) {
                newSelected.set(id, option);
                helpers.setValue([...Array.from(field.value), option]);
            }
        } else {
            if ( type === ActionType.Delete ) {
                newSelected.delete(id);
                helpers.setValue(Array.from(field.value).filter(e => e != option));
            }
        }
        setSelected(newSelected);
        onChange(id, option, selected);
    };

    console.log(name, label, options, isMulti)

    return (
        <div className={styles.mainContainer}>
            <span className={styles.label}>{label}</span>
            <div className={styles.selectContainer}>
                <select multiple={isMulti} name={name} {...field} style={{display:"none"}}>
                    {
                        Array.from(options).map((option,i) => {
                            return <option value={option[0]} key={i}>{option[1]}</option>
                        })
                    }
                </select>
                <Field className={styles.field}  as="select"  value={selectedId||""}>
                    {
                        Array.from(options).map((option, i) => {
                            return <option onClick={() => {
                                onClick(option[0], option[1], ActionType.Add)
                            } } value={option[0]} key={i}>{option[1]}</option>
                        })
                    }
                </Field>
            </div>
            <div className={styles.selected}>
            {
                Array.from(selected).map((option) => {
                    return <Selection option={option} onClick={() => {
                        onClick(option[0], option[1], ActionType.Delete)
                    }} />
                })
            }
            </div>
        </div>
    );
};

export default OptionSelect;
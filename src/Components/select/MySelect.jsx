import styles from './MySelect.module.css'
import Form from 'react-bootstrap/Form';

const MySelect = ({ defaultValue, filterBy, value, onChange }) => {
  return (

     <Form.Select className={styles.formSelect}
           value={value} 
           onChange={(event) => {
             onChange(event.target.value);
           }}>
          <option>{defaultValue}</option>
     {filterBy.map((criteria, index) => {
       return (
          <option key={index} value={criteria.value}>
            {criteria.name}
          </option>
        );
      })}
      </Form.Select>

      
    // <select
    //   value={value}
    //   onChange={(event) => {
    //     onChange(event.target.value);
    //   }}
    // >
    //   <option>{defaultValue}</option>
    //   {filterBy.map((criteria, index) => {
    //     return (
    //       <option key={index} value={criteria.value}>
    //         {criteria.name}
    //       </option>
    //     );
    //   })}
    // </select>
  );
};

export default MySelect;

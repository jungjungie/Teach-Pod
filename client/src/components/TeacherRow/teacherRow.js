import React from 'react';
import style from "./teacherRow.css"
import {
    Button
} from 'reactstrap';

const TeacherRow = (props) => {
    return (

        <tr className="vertAlign">
            <td className="vertAlign teacherRowImg"><img className="teacherThumbnails" src={props.image} alt={props.name}/></td>
            <td className="vertAlign"><a href="/profile" className="teacherTableName aquaText">{props.name}</a></td>
            <td className="vertAlign">{props.gradesTaught}</td>
            <td className="vertAlign">${props.price}</td>
            <td className="vertAlign">{props.capacity}</td>
            <td className="vertAlign"><Button className="cardBtn cardInfo vertAlign darkHtnHover darkHvr-fade"><i class="fa fa-comments" aria-hidden="true"></i></Button></td>
        </tr>
    );
};

export default TeacherRow;
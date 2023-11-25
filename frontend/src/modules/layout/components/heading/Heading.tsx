import React from 'react';

interface IProps {
    heading: string;
    color: string;
}

export const Heading: React.FC<IProps> = (props) => {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        <p className={`h3 ${props.color}`}>{props.heading}</p>
                        <p className="fst-italic">Registered as “NBFC with reserve bank of India ,
                        Sugmya Finance Private Limited is today one of the leading and most trusted NBFC company in India. 
                        Sugmya finance private limited (SFPL), true to the meaning of its name (‘Easily Accessible’), 
                        Bridges the gap between people’s aspirations, wishes and reality.</p>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Heading;
import React from 'react';

interface FieldsProps {
    fields?: number;
}

const Fields = (props: FieldsProps): JSX.Element => {
    return <div>{props.fields}</div>
}

export default Fields;
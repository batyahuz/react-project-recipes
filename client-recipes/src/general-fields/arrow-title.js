import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

export default function ArrowTitle({ title, container }) {
    return (<Tooltip title={title} arrow><span>{container}</span></Tooltip>);
}

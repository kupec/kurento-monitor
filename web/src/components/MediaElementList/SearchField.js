import React from 'react';
import {TextField} from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';

export default function SearchField(props) {
    return (
        <div className="searchBar">
            <SearchIcon className="searchBarIcon"/>
            <TextField className="searchBarField"
                       name="search"
                       placeholder="Search by name"
                       onChange={props.onChange}/>
        </div>
    );
}
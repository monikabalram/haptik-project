import React, { Component } from 'react';

import CustomTable from '../components/customPaginationTable';
import DialogBox from '../components/dialogBox';

import TextField from '@material-ui/core/TextField';

import './friends.css'

class FriendsList extends Component {
    constructor(){
        super();
        this.state={
            openDialog : false,
            searchText : "",
            deleteRowId : "",
            friendsList : [],
            searchList : []
        }
    }

    handleSearch(e) {
        let {friendsList, searchList} = this.state;
        this.setState({searchText : e.target.value})
        if(e.target.value) {
            searchList = friendsList.filter(friend => friend.name.toLowerCase().includes(e.target.value.toLowerCase())).sort((friendA,friendB) => friendB.favorite - friendA.favorite);
            this.setState({searchList})
        } else {
            this.setState({searchList : friendsList})
        }
    }

    handleKeyDown(e) {
        let {friendsList, searchText} = this.state
        if(e.keyCode === 13) { // keyCode for enter
            var list = friendsList.filter(friend => friend.name.toLowerCase() === searchText.toLowerCase())
            if(list.length === 0 && searchText && searchText !== ' ') {
                var friendObj = {
                    _id : Math.random(),
                    name : searchText,
                    favorite : false
                }
                friendsList.push(friendObj);
                this.setState({friendsList})
            } else {
                // alert('name already exists');
            }
            this.setState({searchText : "", searchList : friendsList})
        }
    }

    setFavorite(_id) {
        let {friendsList} = this.state;
         friendsList.map((friend) => {
                if (friend._id === _id)
                 friend.favorite = !friend.favorite;
                 return friend;
            })
        friendsList = friendsList.sort((friendA,friendB) => friendB.favorite - friendA.favorite)
        this.setState({friendsList, searchList : friendsList})
    }

    closeDialog(value) {
        let {friendsList, deleteRowId} = this.state; 
        if(value === 'ok') {
            friendsList.map((friend, index) => {
                if (friend._id === deleteRowId) {
                 friendsList.splice(index,1)
                }
                 return friend;
            })
        this.setState({friendsList, searchList : friendsList})
        }
        this.setState({openDialog: false, deleteRowId : ""})
    }

    deleteFriend(_id) {
       this.setState({deleteRowId : _id, openDialog: true})
    }

    render() {
        const {searchList, searchText, friendsList, openDialog} = this.state;
        return (
            <div className="page-centre">
                <div className="" style={{color:'black', width:'500px'}}>
                    <div className="title p-10">Friend's List</div>

                    {/* search box */}
                    <TextField placeholder="Enter your friend's name" fullWidth variant="outlined" value={searchText} onKeyDown={(e) => this.handleKeyDown(e)} onChange={(e) => this.handleSearch(e)} />

                    {/* pagination table */}
                    {friendsList.length > 0 ? <CustomTable rows={searchList} searchText={searchText} setRow={this.setFavorite.bind(this)} deleteRow={this.deleteFriend.bind(this)}/>
                    : <div>Add friends in your contact list</div>}

                    {/* delete confirmation box */}
                    {openDialog && <DialogBox open={openDialog} handleClose={this.closeDialog.bind(this)}/>}
                </div>
            </div>
        )
    }
}
export default FriendsList;
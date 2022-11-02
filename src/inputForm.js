import React, { Component } from "react"
import Deletebtn from './img/Delete-button.png';
import './inputForm.css';
var listNum = 0;
class InputForm extends Component {
    constructor(props) {
        super(props)
        this.delete = this.handledelete.bind(this);
        this.state = {
            value: "",
            //將memo建立在inputForm submit時傳入CreateMemo
            //(或許可以傳進CreateMemo在做更新?)
            memo: []
        }
    }
    GenNonDuplicateID() {
        return Math.random().toString(36).substring(2)
    }
    handleInput(e) {
        if (e.target.value.length <= 10) {
            this.setState({
                value: e.target.value, //防呆或輸入限制可做更新
            })
        }
    }

    handledelete(index) {
        listNum--;
        this.state.memo.splice(index, 1)
        this.setState({
            memo: this.state.memo //比較方便看懂
        })
    }

    handleClick() {
        if (this.state.value != "") {
            if (listNum < 25) {
                listNum++;
                this.state.memo.push({todo:this.state.value,id:this.GenNonDuplicateID()})
                this.setState({
                    memo: this.state.memo
                })
            }
        }
        else {
            alert("請輸入點什麼")
        }
    }

    render() {
        return (
            <div className="container">
                <input className="memoInput" type="text" onInput={(e) => this.handleInput(e)}
                    value={this.state.value} />
                <button className="submitBTN" onClick={() => this.handleClick()}>submit</button>
                <CreateMemo memo={this.state.memo} delete={this.delete}></CreateMemo>
            </div>
        )
    }
}

class CreateMemo extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        //使用map處理陣列
        let del = this.props.delete //先將delete函數取出方便下面使用
        //在map函數中無法讀取到this.props(因為this位置已經移動到使用map函數的地方?因此讀不到props)
     
        let lists = this.props.memo.map(function (list, index) { //箭頭函數使用問題(index) => (index) 前面的括弧也放入會回報物件活動狀況
            //如:下面用button時使用(index) => (index) 會回報整個button的內容
            //但() => (index)就只會回報你放入得字串index
            return (
                <li className="memolist" key={list.id}>{list.todo}<img className="deleteBTN" src={Deletebtn} onClick={() => del(index)} alt="deleteBTN"></img></li>
            )
        })
        return (
            <div className="memolist2">
                <ul className="listyle">
                    {lists}
                </ul>
            </div>
        )
    }
}


export default InputForm
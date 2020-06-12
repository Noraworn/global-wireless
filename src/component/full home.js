import React, { Component } from 'react'

const randomInt = require('random-int')

class NavSide extends Component {
    constructor() {
        super();
        this.state = {
            random: JSON.parse(localStorage.getItem('data')),
            divide: [],
            multiple: [],
            delete: false,
            importFile: []
        }
        this.setImport = this.setImport.bind(this)
    }

    export() {
        var FileSaver = require('file-saver')
        if (this.state.random !== null && this.state.delete == false) {
            var text = []
            this.state.random.map((number, index) => {
                if (index == 0) {
                    text.push('(' + number + ') ')
                } else {
                    text.push(' (' + number + ') ')
                }
            })
            var blob = new Blob(
                [
                    "DROP TABLE dataNumber; " + '\n' +
                    "CREATE TABLE dataNumber(number INTEGER); " + '\n' +
                    "INSERT INTO dataNumber VALUES " +
                    text + ";"
                ],
                { type: "text/plain;charset=utf-8" }
            )
            FileSaver.saveAs(blob, "data.txt")
        } else {
            var blob = new Blob(
                [
                    "DROP TABLE dataNumber; "
                ],
                { type: "text/plain;charset=utf-8" }
            )
            FileSaver.saveAs(blob, "data.txt")
        }
    }

    import() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var preview = document.getElementById('show-text');
            var file = document.querySelector('input[type=file]').files[0];
            var reader = new FileReader()

            var textFile = /text.*/;
            var slice = []

            if (file.type.match(textFile)) {
                reader.onload = function (event) {
                    preview.innerHTML = event.target.result;
                    var text = event.target.result
                    var split = text.split(" (")
                    split.map((text, index) => {
                        if (index !== 0) {
                            slice.push(parseInt(text.slice(0, 2)))
                            // console.log(slice)
                        }
                    })
                    console.log(slice)
                    // this.importFile(slice)
                }
                console.log(slice)
            } else {
                preview.innerHTML = "<span className='error'>It doesn't seem to be a text file!</span>";
            }
            reader.readAsText(file);
        } else {
            alert("Your browser is too old to support HTML5 File API");
        }
    }

    setImport(slice) {
        console.log(slice)
    }

    random() {
        var randomArray = []
        var upload = false
        if (this.state.random !== null) {
            randomArray = this.state.random
        }
        for (var i = 0; i < 10; i++) {
            var random = randomInt(10, 99)
            randomArray.push(random)
            this.setState({ random: randomArray })
        }

        if (localStorage.getItem('data') == null) {
            var data = []
            randomArray.map(numb => {
                data.push(numb)
            })
            localStorage.setItem('data', JSON.stringify(data))
        } else {
            var data = JSON.parse(localStorage.getItem('data'))
            var newArray = []
            randomArray.map((numb, index) => {
                newArray.push(numb)
            })
            localStorage.setItem('data', JSON.stringify(newArray))
        }

        this.setState({ delete: false })

    }

    divide() {
        var random = []
        if (this.state.random !== null) {
            random = this.state.random
        }
        var divideArray = []
        for (var i = 0; i < random.length; i++) {
            for (var j = 0; j < random.length; j++) {
                if (i !== j) {
                    if (i > j && random[i] % random[j] == 0) {
                        var pair = [random[i], random[j]]
                        divideArray.push(pair)
                        this.setState({ divide: divideArray })
                    }
                }
            }
        }
    }

    multiple() {
        var random = []
        if (this.state.random !== null) {
            random = this.state.random
        }
        var multipleArray = []
        for (var i = 0; i < random.length; i++) {
            for (var j = 0; j < random.length; j++) {
                if (i !== j) {
                    if (i > j && random[i] * random[j] == 1000) {
                        var pair = [random[i], random[j]]
                        multipleArray.push(pair)
                        this.setState({ multiple: multipleArray })
                    }
                }
            }
        }
    }

    delete() {
        this.setState({
            random: [],
            divide: [],
            multiple: [],
            delete: true
        })
        localStorage.removeItem('data')
    }

    render() {
        const { random, divide, multiple } = this.state
        // console.log(this.state.importFile)
        return (
            <div className="container-fluid">
                <div className="text-center text-uppercase">
                    <br />
                    <h1>Random Numbers</h1>
                </div>
                <div className="row justify-content-md-around">
                    <div className="col-8 bg-white">
                        <br />
                        <div className="row">
                            <div className="col text-center">
                                <button className="btn btn-warning" type="button" data-toggle="collapse" data-target="#show" aria-expanded="false" aria-controls="collapseExample">Show Number</button>
                            </div>
                            <div className="col text-center">
                                <button className="btn btn-primary" onClick={() => this.random()}>Random Number</button>
                            </div>
                            <div className="col text-center">
                                <button className="btn btn-secondary" onClick={() => this.delete()}>Delete Number</button>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col text-center">
                                <button className="btn btn-success" onClick={() => this.export()}>Export Numbers</button>
                            </div>
                            <div className="col text-center">
                                <input type="file" onChange={() => this.import()} />
                                <h5 className="text-left" id="show-text">Import Numbers</h5>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col text-center">
                                <button className="btn btn-outline-info" type="button" data-toggle="collapse" data-target="#divide" aria-expanded="false" aria-controls="collapseExample"
                                    onClick={() => this.divide()}>Divide</button>
                            </div>

                            <div className="col text-center">
                                <button className="btn btn-outline-success" type="button" data-toggle="collapse" data-target="#multiple" aria-expanded="false" aria-controls="collapseExample"
                                    onClick={() => this.multiple()}>Multiple</button>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <div className="collapse" id="show">
                                    <div className="card card-body">
                                        {(random !== null) ?
                                            <table className="table">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Number</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {random.map((numb, index) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{numb}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            :
                                            <table className="table">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Number</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">-</th>
                                                        <td>-</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="col collapse" id="divide">
                                    <div className="card card-body">
                                        {(divide.length !== 0) ?
                                            <table className="table">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Divide</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {divide.map((numb, index) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{numb[0]} , {numb[1]}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            :
                                            <table className="table">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Number</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">-</th>
                                                        <td>-</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="col collapse" id="multiple">
                                    <div className="card card-body">
                                        {(multiple.length !== 0) ?
                                            <table className="table">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Multiple</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {multiple.map((numb, index) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{numb[0]} , {numb[1]}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            :
                                            <table className="table">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Number</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">-</th>
                                                        <td>-</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default NavSide
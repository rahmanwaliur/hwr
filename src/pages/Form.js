import React from 'react';
var numeral = require('numeral');
import InputRange from 'react-input-range';
import Menu from 'react-menus';

class Form extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            poster_price: 10.00,

            count_in: 0,
            add: 0,
            total_in: 0,
            comp: 0,
            count_out: 0,
            total_sold: 0,
            gross: 0
        };
    }

     handleCountInChange(e) {

         this.setState({count_in: e.target.value});

         var count_in_value = numeral(e.target.value);

         var total = count_in_value.add(this.state.add);

         this.setState({total_in: total.value()});

         this.setState({total_sold: total.value() - this.state.count_out - this.state.comp});

         this.setState({gross: (total.value() - this.state.count_out - this.state.comp) * this.state.poster_price});
    }

    handleAddChange(e) {

        this.setState({add: e.target.value});

        var add_value = numeral(e.target.value);

        var total = add_value.add(this.state.count_in);

        this.setState({total_in: total.value()});

        this.setState({total_sold: total.value() - this.state.count_out - this.state.comp});

        this.setState({gross: (total.value() - this.state.count_out - this.state.comp) * this.state.poster_price});

    }

    handleCompChange(e) {

        var comp_value = numeral(e.target.value);
        var comp_total_out = comp_value.add(this.state.count_out);

        if(comp_total_out.value() > this.state.total_in) {
            this.setState({comp: 0});
            alert("'comp' + 'total out' cannot be higher than 'total in'");
        }
        else {
            this.setState({comp: e.target.value});

            this.setState({total_sold: this.state.total_in - this.state.count_out - e.target.value});

            this.setState({gross: (this.state.total_in - this.state.count_out - e.target.value) * this.state.poster_price});
        }
    }

    handleCountOutChange(e) {

        var count_out_value = numeral(e.target.value);
        var comp_total_out = count_out_value.add(this.state.comp);

        if(comp_total_out.value() > this.state.total_in) {
            console.log(e.target.value + this.state.comp);
            this.setState({count_out: 0});
            alert("'comp' + 'total out' cannot be higher than 'total in'");
        }
        else {

            this.setState({count_out: e.target.value});

            this.setState({total_sold: this.state.total_in - e.target.value - this.state.comp});

            this.setState({gross: (this.state.total_in - e.target.value - this.state.comp) * this.state.poster_price});
        }
    }



    popupMenu() {

    }

    handleSettlement() {
        this.setState({
            count_in: 0,
            add: 0,
            total_in: 0,
            comp: 0,
            count_out: 0,
            total_sold: 0,
            gross: 0
        });
    }


    render() {

        return (
            <div id="container">
                <div id="poster">
                  <table>
                      <thead>
                      <tr>
                          <th></th>
                          <th id="poster-label">Poster</th>
                          <th></th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td><input type="radio" defaultChecked/></td>
                          <td><img src={'http://img.chaptercheats.com/boxshot/260166.jpg'} /></td>
                          <td id="price">{numeral(this.state.poster_price).format('$0,0.00')}</td>
                      </tr>
                      </tbody>
                  </table>
                </div>
                <div id="table">
                    <table>
                        <thead>
                        <tr>
                            <th>QTY available</th>
                            <th>Count In</th>
                            <th>Add</th>
                            <th>Total In</th>
                            <th>Comp</th>
                            <th>Count Out</th>
                            <th>Total Sold</th>
                            <th>Gross</th>
                        </tr>
                        </thead>

                        <tfoot>
                        <tr>
                            <td></td>
                            <td>
                                <input type="submit" value="More" onClick={this.popupMenu.bind(this)} />
                            </td>
                            <td></td>
                            <td id="total-in-show">{this.state.total_in}</td>
                            <td id="comp-show">{this.state.comp}</td>
                            <td id="count-out-show">{this.state.count_out}</td>
                            <td id="total-sold-show">{this.state.total_sold}</td>
                            <td id="gross-show">{numeral(this.state.gross).format('$0,0.00')}</td>
                        </tr>
                        </tfoot>
                        <tbody>
                        <tr>
                            <td>-7</td>
                            <td><input type="text" id="count-in" defaultValue={this.state.count_in} onInput={function(e){if(e.target.value < 0) {alert("Enter a positive value only"); e.target.value = 0;}}} onBlur={this.handleCountInChange.bind(this)} /></td>
                            <td><input type="text" id="add" defaultValue={this.state.add} onInput={function(e){if(e.target.value < 0) {alert("Enter a positive value only"); e.target.value = 0;}}} onBlur={this.handleAddChange.bind(this)} /></td>
                            <td><input type="text" id="total-in" value={this.state.total_in} readOnly /></td>
                            <td><input type="text" id="comp" defaultValue={this.state.comp} onInput={function(e){if(e.target.value < 0) {alert("Enter a positive value only"); e.target.value = 0;}}} onBlur={this.handleCompChange.bind(this)} /></td>
                            <td><input type="text" id="count-out" defaultValue={this.state.count_out} onInput={function(e){if(e.target.value < 0) {alert("Enter a positive value only"); e.target.value = 0;}}} onBlur={this.handleCountOutChange.bind(this)} /></td>
                            <td><input type="text" id="total-sold" value={this.state.total_sold} readOnly /></td>
                            <td><input type="text" id="gross" value={numeral(this.state.gross).format('00.00')} readOnly /></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div id="show-total">
                    <p>TOTAL</p>
                    <p>{this.state.total_sold}</p>
                    <p>UNITS SOLD</p>
                    <input type="submit" id="settle" value="SETTLE" onClick={this.handleSettlement.bind(this)} />
                </div>
            </div>
        );
    }
}


export default Form;
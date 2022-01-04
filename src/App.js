import React from 'react';
import './App.css';

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      questions: [
        {
          text: 'This is the first day of the week',
          solved: false,
          orientation: 'vertical',
          liters: [
            {position_top:1, position_left:4, value: 'M'},
            {position_top:2, position_left:4, value: 'O'},
            {position_top:3, position_left:4, value: 'N'},
            {position_top:4, position_left:4, value: 'D'},
            {position_top:5, position_left:4, value: 'A'},
            {position_top:6, position_left:4, value: 'Y'},
          ],
        },
        {
          text: 'This days starts the weekend! Thank gosh it\'s _______!',
          solved: false,
          orientation: 'vertical',
          liters: [
            {position_top:2, position_left:11, value: 'F'},
            {position_top:3, position_left:11, value: 'R'},
            {position_top:4, position_left:11, value: 'I'},
            {position_top:5, position_left:11, value: 'D'},
            {position_top:6, position_left:11, value: 'A'},
            {position_top:7, position_left:11, value: 'Y'},
          ],
        },
        {
          text: '"Hump" day. This day is in the middle of the week.',
          solved: false,
          orientation: 'horizontal',
          liters: [
            {position_top:3, position_left:1, value: 'W'},
            {position_top:3, position_left:2, value: 'E'},
            {position_top:3, position_left:3, value: 'D'},
            {position_top:3, position_left:4, value: 'N'},
            {position_top:3, position_left:5, value: 'E'},
            {position_top:3, position_left:6, value: 'S'},
            {position_top:3, position_left:7, value: 'D'},
            {position_top:3, position_left:8, value: 'A'},
            {position_top:3, position_left:9, value: 'Y'},
          ],
        },
        {
          text: 'Starts with the letter "S". It\'s not Sunday!',
          solved: false,
          orientation: 'vertical',
          liters: [
            {position_top:3, position_left:6, value: 'S'},
            {position_top:4, position_left:6, value: 'A'},
            {position_top:5, position_left:6, value: 'T'},
            {position_top:6, position_left:6, value: 'U'},
            {position_top:7, position_left:6, value: 'R'},
            {position_top:8, position_left:6, value: 'D'},
            {position_top:9, position_left:6, value: 'A'},
            {position_top:10, position_left:6, value: 'Y'},
          ],
        },
        {
          text: 'Abbreviated as "Thurs"',
          solved: false,
          orientation: 'horizontal',
          liters: [
            {position_top:5, position_left:6, value: 'T'},
            {position_top:5, position_left:7, value: 'H'},
            {position_top:5, position_left:8, value: 'U'},
            {position_top:5, position_left:9, value: 'R'},
            {position_top:5, position_left:10, value: 'S'},
            {position_top:5, position_left:11, value: 'D'},
            {position_top:5, position_left:12, value: 'A'},
            {position_top:5, position_left:13, value: 'Y'},
          ],
        },
        {
          text: 'People say this is the most productive day of the week. Hint: it isn\'t Monday!',
          solved: false,
          orientation: 'horizontal',
          liters: [
            {position_top:8, position_left:2, value: 'T'},
            {position_top:8, position_left:3, value: 'U'},
            {position_top:8, position_left:4, value: 'E'},
            {position_top:8, position_left:5, value: 'S'},
            {position_top:8, position_left:5, value: 'D'},
            {position_top:8, position_left:6, value: 'A'},
            {position_top:8, position_left:7, value: 'Y'},
          ],
        },
        {
          text: 'The last day of the week. A day to rest.',
          solved: false,
          orientation: 'horizontal',
          liters: [
            {position_top:10, position_left:1, value: 'S'},
            {position_top:10, position_left:2, value: 'U'},
            {position_top:10, position_left:3, value: 'N'},
            {position_top:10, position_left:4, value: 'D'},
            {position_top:10, position_left:5, value: 'A'},
            {position_top:10, position_left:6, value: 'Y'},
          ],
        },
      ],
    };
  }

  renderQuestions() {
    let questions = [];
    for(let i = 0; i < this.state.questions.length; i++) {
      questions.push(<Question text={this.state.questions[i].text} solved={this.state.questions[i].solved} key={i}/>)
    }
    return questions;
  }

  validate(input_value){
    return input_value.replace(/\W|\d/g, '').substr(0, 1).toUpperCase();
  }

  handleChange(event) {
    let letter = this.validate(event.target.value);
    event.target.value = letter;
    let row_index = event.target.getAttribute('row_index');

    let word = document.querySelectorAll('[row_index="' + row_index + '"]');
    word = Array.from(word).map(item => item.value);

    let result = true;
    for(var i = 0; i < this.state.questions[row_index].liters.length; i++) {
      if(word[i] !== this.state.questions[row_index].liters[i].value) {
        result = false;
        break;
      }
    }
    if(result) {
      const questions = this.state.questions.slice();
      questions[row_index].solved = true;
      this.setState({questions: questions});
    }
  }

  renderRow(self, row_index) {
    let row = self.state.questions[row_index].liters.map(function(item, index) {
      let class_name = '';
      class_name = (index === 0) ? 'input first' : 'input';
      return self.renderCell(row_index, index, class_name);
    });
    return row;
  }

  renderRows(self) {
    let rows = [];
    for(let i = 0; i < self.state.questions.length; i++) {
      rows.push(self.renderRow(self, i));
    }
    return rows;
  }

  renderCell(row_index, index, className) {
    return (
      <Cell 
        class={className}
        row={this.state.questions[row_index].liters[index].position_top} 
        column={this.state.questions[row_index].liters[index].position_left} 
        index={index}
        row_index={row_index}
        key={index}
        onChange={this.handleChange}
      />
    );
  }

  render() {
    return (
      <div className="container">
        <div className="field">
          {this.renderRows(this)}
        </div>
        <div className="questions">
          <ol>
            {this.renderQuestions()}
          </ol>  
        </div>
      </div>
    )
  }
}

class Cell extends React.Component {
  render() {
    return (
      <label 
        className={this.props.class} 
        style={{left: 40*(this.props.column-1)+'px', top: 40*(this.props.row-1)+'px'}}
      >
        {(this.props.index === 0) ? <div className="question-index">{this.props.row_index+1}</div> : null}
        <input 
          onChange={this.props.onChange}
          index={this.props.index}
          row_index={this.props.row_index}
          type="text" 
        />
      </label>
    )
  }
}

class Question extends React.Component {
  render() {
    return (
      <li>
        {(this.props.solved) ? <span className="solved">{this.props.text}</span> : <span>{this.props.text}</span>} 
      </li>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Field />
    </div>
  );
}

export default App;

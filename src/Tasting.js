import React, { Component } from 'react';

import CreatableSelect from 'react-select/lib/Creatable';
import makeAnimated from 'react-select/lib/animated';

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

export class Tasting extends Component<*, State> {
  state = {
    inputValue: '',
    value: [],
  };

  componentDidUpdate(prevProps) {
    if(prevProps != this.props) {
      this.setState({value: this.props.preset})
    }
  }

  handleChange = (value: any, actionMeta: any) => {
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    this.setState({ value });
    this.props.tasting(value)
  };

  handleInputChange = (inputValue: string) => {
    this.setState({ inputValue });
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
      case ',':
        console.group('Value Added');
        console.log(value);
        console.groupEnd();
        this.setState({
          inputValue: '',
          value: [...value, createOption(inputValue)],
        });
        this.props.tasting([...value, createOption(inputValue)])
        event.preventDefault();
    }
  };

  render() {
    const { value, inputValue } = this.state;
    return (
      <CreatableSelect
        components={makeAnimated(components)}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder=''
        value={value}
      />
    );
  }
}

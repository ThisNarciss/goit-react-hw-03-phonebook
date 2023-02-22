import PropTypes from 'prop-types';
import { Component } from 'react';
import { SectionBox, Title, TitleBox, IconPhone } from './Section.styled';

export class Section extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title, children } = this.props;
    return (
      <SectionBox>
        <TitleBox>
          {title.toLowerCase() === 'phonebook' && <IconPhone size={30} />}

          <Title>{title}</Title>
        </TitleBox>

        {children}
      </SectionBox>
    );
  }
}

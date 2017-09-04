import React , { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { observer } from 'mobx-react'

import { colors, fonts, breakpoints } from '../assets/styles/Common';
import { MESSAGE_TYPES } from '../stores/MessageStore';
import LogoImage from '../assets/images/summoner-expert.svg';

const styles = StyleSheet.create({
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '2rem 0',

    [breakpoints.mobile]: {
      maxWidth: '100%',
    },

    [breakpoints.desktop]: {
      maxWidth: '60rem',
    },
  },
  message: {
    ...fonts.body,
    flex: '0 1 auto',
    padding: '1rem',
    marginLeft: '1.5rem',
    borderRadius: '2px',
    position: 'relative',

    ':after': {
      content: '""',
    	position: 'absolute',
    	left: 0,
    	top: '50%',
    	width: 0,
    	height: 0,
    	border: '10px solid transparent',
    	borderLeft: 0,
    	marginTop: '-10px',
    	marginLeft: '-10px',
    }
  },
  botMessage: {
    background: colors.white,
    color: colors.darkGrey,

    ':after': {
      borderRightColor: colors.white,
    }
  },
  userMessage: {
    background: colors.blue,
    color: colors.white,

    ':after': {
      borderRightColor: colors.blue,
    }
  },
  image: {
    flex: 'none',
    height: 50,
    width: 50,
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: colors.white,
  },
});

@observer
class MessageView extends Component {
  componentDidUpdate() {
    this.message.scrollIntoView();
  }

  render() {
    const { message: { text, type }, avatar } = this.props;
    let messageStyle, messageAvatar;

    if (type === MESSAGE_TYPES.user) {
      messageStyle = styles.userMessage;
      messageAvatar = StyleSheet.create({
        avatar: {
          backgroundImage: `url(${avatar})`
        }
      })
    } else {
      messageStyle = styles.botMessage;
      messageAvatar = StyleSheet.create({
        avatar: { backgroundImage: `url(${LogoImage})` }
      });
    }

    return (
      <div className={css(styles.messageContainer)}>
        <div className={css(styles.image, messageAvatar.avatar)} />
        <div
          ref={(message) => this.message = message }
          className={css(styles.message, messageStyle)}
        >
          {text || 'Loading...'}
        </div>
      </div>

    );
  }
};

export default MessageView;

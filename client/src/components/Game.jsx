import React from 'react';
import Brick from './Brick.jsx';
import dictionary from '../dictionary.js';
import Timer from './Timer.jsx';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      words: [],
      time: 0,
      gudetama: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABAlBMVEX////8sEAAAADR0tT2iyn/s0H/tUL/uEP/tEL8/Pz/uUP8skHOz9H39/fv7+/2iSjFxcXy8vKSkpKlpaX4szLm5uba2tqxsbESEhLg4OC3t7dwcHDExMSIiIiYmJikdCrtpz1TU1NkZGR7e3tDQ0McHBzcmzi0tLQ5OTlVVVWIYSMoKChKSkqKiorHjTMMDAz3ky5xUB2WaiYvLy+1gC/OkjVRORUoGwqKYyQaEgZBLhH5njWvfC0sLCz3qgD8qyr9yIIxIg1hRRlELhDMijF5Vx/6pzpYPhb/xHL/8d/9057alB7/3qphPQCJWAD8ul6YYwD+5sr/5rn+9+r5vVP6yHVcpOZdAAANIklEQVR4nO2dDV/avhbHodCWAq0U1vKMFRAVAQXx2fl4dQ939+7u7/b+38rNSdJSR4FCiyl+8t2mQyvkx0nOOTlJaizG4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PZVF5ZN2DNvH66/c26Devlz6dPt79YN2Kt3CKF31g3Yp38Qgo/sW7EWrlHAn+wbsRaQQJvFdaNWCffUCf9w7oRa+UHMuE/rBuxVv589E4Kw/CedRvWyuvtp9uPnbQpt7f3rNuwZn79/Nij8MPz+vv3/ccehRAqPna4//1BYoWiGxh9yqf8c7vpU8PyXv3g5EhwKLWrjZzmuuDbjw0WqO41BW92W7UPECESs+RRmjnWLQxGbt9Wcv54sT0edIDTwXg0fJpYssC6latj9Ki6i9O4LEsp0UGS5JQ1frZFbqrGBml+10pLYtwDUZI7Xep5sqwbuwJ6G7d9+076+jVz56UQi5TGV/i66sb5nDJu93/F77g++H2WRCQyPXjAw7HMusnLkYVGX/7brp29zlaINMo3+O3YKK+agxb/56vT877OEYiQLOxaiyybvBwm7qFO8fP15zwTYuTuRknUoLX/cwpnv7z1iWkpJTtuNo17ao1ls5fgECz43X507y1QGoATfbroyNSKY5BosGy3b6qopcM0ffA6K1J07HA/lKhEsOIu05b7pIYa+nBHB+G3O1GUU/GMNC3RSdtu7I4KY7HFtvF+UKDR1h2pSfy6E6XBIwT+KYmidUYVntoZjwz9NsG4/YtpoVaOpZ/4/z/u5AGVIU97Gtm66Q6Ho05qIhpdeMK4/QuBXOYsLd7D/+/vpBEVOLJtiJJRBPWg6AHKxyeiZbi8wljBIg6gj4rxe9RDM3ei7U5G1IRSfHDx5erqcTSIe4zMeDwVfSNCrH9GcsR7iPJU4ZBGBNnqTqa+XSs1rVACfxrteQaY0G2T09FokJFxRxTFC+ENAw8zZmCawVrEFFo2l9DJfw3UwAt3w0VnnEmdS5DVyqpoZpVtYYnT00YJrEzTWdXMZaOQAeTIRH4HJ1zQcMtrgCFrwlWNySwQXfrk4WBP7UlGtomfd5+542k5nW7fjMVg0E03G4BA0NPtnzIqrZKnwriErqujC3ac522ylBeL5d0Dq15EHzqeFQvofT1V18rZSqNFyzeel8pDQWjbBRAC03EJ407YtqzO9iVtzoO3CaVn4W+6ltd7kULe9Ii8BaOOZeEZB0vnCu91B7lK5FBobJ9Ozya91OFhuN1JeV/ohNBuHNICCX6OZa6KphFf0rR7Wbjc0k17KxQz44vhcNgd3Qw6cVlOefZl/DxY36UzqbqAXssO5GcuM7YGMk9/nGFEkq9JqZQ4UxxWhJ9k6LwDaZSN7zBUCDOlq4ydnJBJ7NksiX4AR4O6ut0RROlRYFwwxkXRQdqJ6tgAq0skmfrA9lbp03P0sMRSYEwtQZO+WLRNKQuW0DIzFSw0IQ4i9B2SLGxQ1pUNhYTmCzpwYIo3cyT6sCHyK/Z8Ud4miYS2uBFrpkgCAJ0qiPGOx5zBv8QOjZJinKxONVjLA5TWmwxlrqtciP0kuLsLTfYGJJRPoDneKfdqZMDFHEVppggVxDPvhG0VcNA4iNZyVBM16SZIJHSD51AsMxkvcBExJIHxNPTRqAxBB0hvRuEYMTVmnch4gtebVo/1buTzSJb3azihDBILbUSoIjMvXkxTwJOeMNyp/CWSJqT1jNNg8R4Dk94D1nI8IIlNN7ivSUE++pm1HA8OyNw8uEIZr0mxluMBmimeC7NKbUuB3yp98Su+N59ROIS8Jqg3Fcl6XAR316Cp8A2a8DwH7aa0aBelpJuCWjUehRARqQ2jFw8hLx3LY6/1pCWRTsdHUUzaVKggifMrhX6tmH4QhDxrQVNoIYV7AJKa6O3JKIcTKYjCIfMVJw8SIZYx8EIVa0FT1MJSmCF14UPWgqaAmmIonfSFZqasBU3RCGnqFN+6jovjKCqsC8LVjIW1Zchcbx1ncNCPXGJaFYTHMGyY3EpmcKktCrsw3tALISVFJnzZSm6RdeDIpd6H4VTarpHCF7yDz2St6G/CmDjBMEwmt66xwqjt3CdpaXCFx8lk8jgDk+Cobfk2wklLM8eolx5n5AhOn6Ae7Lk/ZnmFySRWuMdaEkEBVK2c6IezaoEVbuHFbpZnL8xKo9Vsn+y6Tr1iQgiHGWRBpDDNcN3CaPSEWYSQ0sSxwhfYvsfmMNve/kx5KC0NrhACPigkT1h/9/W12q4t5nCn2m8UCsViBcjlTD0vCA8h2PAa2/Bf9utU3zXsK03yqgeFhDr9XaTwKQQbYle6NTlsIrTfL2gY2K/sFj3UAf1wbLiFbSjBKn6rSkXW3ydDJUdCZ8eoHpyyCCzwGitM0jVgo0417taza3c7OrzQzgz7AUIYq6M4VqCcJmXRaKEWDu3u2svn1jpjBB86bzOyEUZaSjxpMnmdgZ0KffLMCbuzgoOrevqAMICtwHPLe7jSFljhMbHhSwbKic6mUqXmEom6bLUYvoeFau/8ZWc49xt8l0KSQFdn3M9fLjTfZFDtfDZUY8J7OP99q4WhkPiZreuMdynKqNTbbpUHxdAKHcaCQRiSQhIMUTSk60+ejsXYa7lktovh+Fhw2gsSKOilQU1Ig+H1XIUYs9B0RPbD8LCLTYinh0FXLXAnRdPfxQqBsjMFCL4DFW6PsOjoKsTLcTCF2JMSgWQcLuyAWoFMBHaD+ta+x6ifokSOHQbhZWsr+UIGM2yG9lX0TpAdIAFnyz0/S10wVkMol9LP6Sffy2vmfvCe6mvJGbry1PZSKe7HrNLUgVlcTfRtl8b8jNkHgq+618m0N5WehTNrkWFFaSSc/7Usl35c6Gjc4D2DQWKj4Kt2CS/z9FYOPsw1nj/jSOHTUqM3STs+hrDMkbyKEGxF1WcfgBB19manQgr2SAndeT1VwidL31ZayT1AlgpzsKcuwAacXX8bIxSocZx3ZFdjM/jQ4ZwDJuSg1HnHdYVEfmjJiveimcF8mj43leN7tgjDTnpy8i5Nj3rNiJTk3kLDybdFObO9kvvP+4mfMyksTtoIKgnAV9udjH2rBHLU68yy4uRWCkCKIpHuOCIDFW6vYI0fSZqy9JpFOVA3BdvU/V3qnAq+er7ppMA2omUfn728OnscPo9Go23KCJ80HMMwTcnWYPTF/uHeClVEIVAJuenfGWvuyeoznAMVM5fCHEBgKr79MPlKe6VltROnKLAK0AV879lViwcujZLbijMEOrc/gZfpr1hY2wm2iwpSsmVOqprF1glp8VmK3mugWGzUW9WD3v7J5xIBlj2GaXorDESp2citPm9vB9wnBi6kt9zLK+TGEF0pnobqp8cV8L7ZZ7fbxYAVfCFgbqrDSdGlT5IZUAokndArQ4Hq1WMan+EKvJIGAynYsriOlyyWPQ0IrzvAndDzB2HAPsLNTHx66jmAMwxY0FCI/1hyqaREHYh31qfa/iXwraH2hDC2axaot8svIZLeFmRWpDKowqBNA4Fh7KGaxLqDfM1ff1VhJB7NHiA67hkBd12o1RCehOIslUC7mw0/yyW1wnwHUC4G9KJaf243WRql0nQH7JNWhen2M7NBi6ehrjIq2UazJLiNWXjnDVqqZsBtbqpOaXgdJ761XH7HbcyD91FpVPLNqa0EzfW9dHmvdeh+pfDWEbwwCzt/a0P0Cuveh6rn8q51hMN64MM8im6UzYRpvvFi6tsFNsxur1U032lHipJwb7Kp1lbPn1XDzGazCYRr8Ux1e7fDZr9Qy5oev3xg3SjZ/GSANFdzbbpJ1CF9piMwN7HeTmNdK8B+USuT1rSWzcRUI0Hloc+2bzScosFu8P4fEon+Z7s/FXy/4bD1LzvRRx2WUrH7/ud8tLZEl/O2h12wbUtRVF0Dv+KoA4FUTNnJn+qR2w+NMO078bVm2VE3kRhMwo09AB3zRfiXQ1RoEPFOGPW3wpwOioOb0V++ozMhQZx826urGh4KqYOp2ZWsavTvKBwrE40eHU2dUpg1QZ+WL9nmi9yZGW+yuPrhUaVQE27vgvwn9EfHfM2ohAY/4BBZ8pif6oaZIJ6mjOU5sa/U2BDz2ZDqx4wbrSo0+dKKdnYbYec5kzJN5/qz4prZsBO+o0bkbizkj6IdvKtF843/V8q1/CRp30TzORScLeLCUa/Zyufz/Vaz7d6M194U5zkTeuNjbw6CFvWjgZKrexxmKL17mWfNlOG8TW9/f7+902w1Kma00zIOh8PhcDgcDofD4XA4HA6Hw+FwOJwNQNE0VTFimh6L6Yqmos8aehTTFF3TNF0xtBj6AroIFrm1mG7ohhatXwy0ENR2LWbEkMiYAkpjIFYDeQb6p8VUXVeR3hhsYTNAJPzZKJAWpEhRDbAMUYi0IUOVkRRNV5GFNV1HxlWQSqQVfdg0I6oqsl5MVWDpWkF/0BcU2HlB/sJ30T9Vj6EL4CM82jCF0eH//74J9vay0noAAAAASUVORK5CYII=",
      shatteredEgg: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addWord = this.addWord.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
  }

  addWord() {
    var newWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    this.setState({
      words: [...this.state.words, newWord]
    });
  }

  stopGame(intervals) {
    intervals.forEach(interval => {
      clearInterval(interval);
    });
    this.setState({
      gudetama: "https://i2-prod.irishmirror.ie/incoming/article11358170.ece/ALTERNATES/s615/I171017_153342_1646320oTextTRMRMMGLPICT000055183128o.jpg",
      // words: [],
      // time: 0,
    })
  }

  startGame() {
    var timeInterval = setInterval(() => {
      var currentTime = this.state.time;
      currentTime++;
      this.setState({
        time: currentTime,
      })
    }, 1000);
    
    var wordInterval = setInterval(() => {
      this.addWord();
      if (this.state.words.length >= 14) {
        this.stopGame([timeInterval, wordInterval]);
      }
    }, 1000); 
  }

  handleChange(e) {
    this.setState({
      userInput: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    var index = this.state.words.indexOf(this.state.userInput);
    
    if (index !== -1) {
      var newWords = this.state.words.slice();
      newWords.splice(index, 1);
      this.setState({
        words: newWords,
      });
    }

    this.setState({
      userInput: '',
    });
  }

  render() {
    return (
      <div className="game">
        <Timer time={this.state.time} startGame={this.startGame}/>
        <div className="wall"></div>
        <div className="play" >
          <div className="gudetama" style={{'backgroundImage': `url(${this.state.gudetama})`}}></div>
          {this.state.words.map((word, index) => {
            return <Brick word={word} key={index} />
          })}
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.userInput} onChange={this.handleChange} />
          </form>
        </div>
      </div>
    )
  }
}

export default Game;
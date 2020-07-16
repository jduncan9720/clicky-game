import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import GameCard from "./components/GameSection";
import Footer from './components/Footer';
import matches from "./MatchCards";

class App extends React.Component {
  state = {
    matches,
    currentScore: 0,
    bestScore: 0,
    clickMessage: "Try and click each character only once. Click on the same character twice and you lose."
  };

  handleImageClicked = async id => {
    const moviePosters = document.getElementById("game-cards");
    const clickedMatch = this.state.matches.filter(match => match.id === id);
    moviePosters.classList.remove("apply-shake");
    if(clickedMatch[0].clicked) {

      moviePosters.classList.add("apply-shake");
      this.setState({
        currentScore: 0,
        clickMessage:"Oops that's twice!! You lose.  Try again.",
      });
      this.handleResetAllCards();
    } else if(this.state.currentScore < 11) {
      clickedMatch[0].clicked = true;
      // increment the appropriate counter
      this.setState({currentScore: this.state.currentScore + 1}, () => {
        if (this.state.currentScore > this.state.bestScore){
          this.setState({ bestScore: this.state.currentScore});
        }
      });
      this.setState({clickMessage:  "Good guess! You haven't click on that one yet! Keep going!" });
      this.handleShuffleCards();
    } else {
      // Set its value to true
      clickedMatch[0].clicked = true;
      // restart the guess counter
      this.state.currentScore = 0;
      // Egg on the user to play again
      this.state.clickMessage = "Winner!! You cilcked all 12 characters without repeating Now do it again!";
      this.setState({ bestScore: 12 });
      this.handleResetAllCards();
    }
  };

  handleShuffleCards = () => {
    let cards = this.state.matches;
    for (let i = 0; i < cards.length - 1; i++) {
      const j = i + Math.floor(Math.random() * (cards.length - i));

      const temp = cards[j];
      cards[j] = cards[i];
      cards[i] = temp;
    }
    this.setState({matches: cards});
  };

  handleResetAllCards = () => {
    for (let i = 0 ; i < this.state.matches.length ; i++){
      matches[i].clicked = false;
      this.setState({
        currentScore: 0,
        matches: matches
      });
      this.handleShuffleCards()
    }
  };

  render() {
    return (
        <div className="App">
          <Navbar score={this.state.currentScore} topScore={this.state.bestScore} />
          <div className="subHeading">
            <h4>{this.state.clickMessage}</h4>
          </div>
          <div className="container">
            <div id="game-cards" className="row">
              {this.state.matches.map((matchCard, index) => {
                return <GameCard
                    key={index}
                    id={matchCard.id}
                    name={matchCard.name}
                    image={matchCard.image}
                    handleOnClick={this.handleImageClicked}
                />
                
              })}
            </div>

          </div>
          <Footer />
        </div>
    );
  };
}
export default App;
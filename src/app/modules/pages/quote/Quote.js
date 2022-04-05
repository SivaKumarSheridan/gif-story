import classes from "./Quote.module.css";

const Quote = ({ quote }) => {
  return (
    <div className={classes.quote}>
      <div className={classes.anime} title={quote.anime}>
        {quote.anime}
      </div>

      <blockquote>{quote.quote}</blockquote>

      <div className={classes.character} title={quote.character}>
        {quote.character}
      </div>
    </div>
  );
};

export default Quote;

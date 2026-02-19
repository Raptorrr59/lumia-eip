import ConnectFour from "./games/ConnectFour/ConnectFour";
import Snake from "./games/Snake/Snake";
import ImageRecognition from "./games/ImageRecognition/ImageRecognition";

const GameCode = ({ game, isLoading, setIsLoading, isUploaded }) => {
    return (
        <div>
            {game.name === "Snake" && <Snake game={game} isLoading={isLoading} setIsLoading={setIsLoading} isUploaded={isUploaded} />}
            {game.name === "Connect Four" && <ConnectFour game={game} isLoading={isLoading} setIsLoading={setIsLoading} isUploaded={isUploaded} />}
            {game.name === "Image Recognition" && <ImageRecognition game={game} isLoading={isLoading} setIsLoading={setIsLoading} isUploaded={isUploaded} />}
        </div>
    );
}

export default GameCode;
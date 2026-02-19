import React from 'react';
import RankingPlayer from "./RankingPlayers";

const RankingRow = ({ rankingData, scrollable }) => {

    if (scrollable) {
        return (
            <div data-testid="ranking-section" className="flex flex-col overflow-y-auto h-[200px] self-start">
                {rankingData.map((player, index) => (
                    <RankingPlayer key={index} ranking={index + 1} pseudo={player.userName || player.userId} score={player.score ?? player.globalScore} left={true} />
                )
                )}
            </div>
        );
    }

    return (
        <div data-testid="ranking-section" className="flex flex-col">
            {rankingData.slice(0, 6).map((player, index) => (
                <RankingPlayer key={index} ranking={index + 1} pseudo={player.userName || player.userId} score={player.score ?? player.globalScore} left={false} />
            ))}
        </div>
    );
};

export default RankingRow;

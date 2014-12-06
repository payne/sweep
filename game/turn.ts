﻿enum TurnMode {
   Timed,
   Match
}

class TurnManager {

   private _timer: ex.Timer;

   constructor(public logicalGrid: LogicalGrid, public matcher: MatchManager, public turnMode: TurnMode) {
      matcher.on('match', _.bind(this._handleMatchEvent, this));
      this._timer = new ex.Timer(_.bind(this._tick, this), 2000, true);
      game.add(this._timer);
   }

   private _shiftBoard(): void {
      // shift all rows up 1
      for (var i = 0; i < grid.rows; i++) {
         this.logicalGrid.shift(i, i - 1);
      }
      // fill first row
      this.logicalGrid.fill(grid.rows - 1);
   }

   private _handleMatchEvent(evt: MatchEvent) {
      evt.run.forEach(p => p.kill());
      this._shiftBoard();
   }

   private _tick() {
      if (this.turnMode === TurnMode.Timed) {
         this._shiftBoard();
      }
      //ex.Logger.getInstance().info("Tick", new Date());
   }
   
} 
-- CreateTable
CREATE TABLE "games" (
    "id" INTEGER NOT NULL,
    "year" SMALLINT NOT NULL,
    "week" SMALLINT NOT NULL,
    "postseason" SMALLINT NOT NULL DEFAULT 0,
    "id_home_team" INTEGER NOT NULL,
    "id_away_team" INTEGER NOT NULL,
    "points_home" SMALLINT,
    "points_away" SMALLINT,
    "completed" SMALLINT NOT NULL,
    "conference_game" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logos" (
    "id" INTEGER NOT NULL,
    "team_id" INTEGER,
    "year_first" INTEGER NOT NULL,
    "year_last" INTEGER,
    "image" TEXT,

    CONSTRAINT "logos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rankings" (
    "id" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "postseason" SMALLINT NOT NULL DEFAULT 0,
    "poll" TEXT,
    "first_place_votes" SMALLINT,
    "points" SMALLINT,
    "conference" TEXT,
    "ranking" SMALLINT,
    "week" SMALLINT,
    "year" SMALLINT NOT NULL,

    CONSTRAINT "rankings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "records" (
    "id" INTEGER NOT NULL,
    "year" SMALLINT NOT NULL,
    "team_id" INTEGER NOT NULL,
    "division" TEXT,
    "conference" TEXT,
    "win_total" SMALLINT,
    "loss_total" SMALLINT,
    "tie_total" SMALLINT,
    "win_conf" SMALLINT,
    "loss_conf" SMALLINT,
    "tie_conf" SMALLINT,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" INTEGER NOT NULL,
    "name_full" TEXT,
    "name_school" TEXT NOT NULL,
    "mascot" TEXT,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "fx_away_team" FOREIGN KEY ("id_away_team") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "fx_home_team" FOREIGN KEY ("id_home_team") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rankings" ADD CONSTRAINT "fk_team_idx" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "records" ADD CONSTRAINT "fk_team_idx" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

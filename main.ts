radio.setGroup(77);
let mEsq: number;
let mDir: number;

basic.forever(function () {
    radio.sendValue("mEsq", mEsq);
    radio.sendValue("mDir", mDir);
    if(Math.abs(input.acceleration(Dimension.Y)) >= 2 * Math.abs(input.acceleration(Dimension.X))) {
        mEsq = Math.map(input.acceleration(Dimension.Y), 1023, -1023, -255, 255);
        mDir = mEsq;
    } else if(Math.abs(input.acceleration(Dimension.X)) >= 3 * Math.abs(input.acceleration(Dimension.Y)) || input.acceleration(Dimension.Y) >= 0) {
        mEsq = Math.map(input.acceleration(Dimension.X), -1023, 1023, -255, 255);
        mDir = mEsq * -1;
    } else {
        if(input.acceleration(Dimension.X) >= 0) {
            mEsq = Math.map((Math.abs(input.acceleration(Dimension.X)) + Math.abs(input.acceleration(Dimension.Y))) / 2, 0, 1023, 0, 255);
            mDir = 0;
        } else if(input.acceleration(Dimension.X) < 0) {
            mEsq = 0;
            mDir = Math.map((Math.abs(input.acceleration(Dimension.X)) + Math.abs(input.acceleration(Dimension.Y))) / 2, 0, -1023, 0, -255);
        }
    }
})

radio.onReceivedValue(function(name: string, value: number) {
    if(name === "mEsq") {
        robotbit.MotorRunDual(robotbit.Motors.M2A, value, robotbit.Motors.M2B, value);
    } else if(name === "mDir") {
        robotbit.MotorRunDual(robotbit.Motors.M1A, value, robotbit.Motors.M1B, value);
    }
})

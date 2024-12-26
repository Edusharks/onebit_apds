/**
 * Custom blocks for One:Bit
 */


const gestureRightID = 4101;
const gestureLeftID = 4102;
const gestureUpID = 4103;
const gestureDownID = 4104;
const gestureForwardID = 4105;
const gestureBackwardID = 4106;

let DEBUG = 0;
/* APDS-9960 I2C address */
let APDS9960_I2C_ADDR = 0x39

/* Gesture parameters */
let GESTURE_THRESHOLD_OUT = 30
let GESTURE_SENSITIVITY_1 = 33
let GESTURE_SENSITIVITY_2 = 18

/* Error code for returned values */
let ERROR = 0xFF

/* Acceptable device IDs */
let APDS9960_ID_1 = 0xA8
let APDS9960_ID_2 = 0x9C

/* Misc parameters */
let FIFO_PAUSE_TIME = 30      // Wait period (ms) between FIFO reads

/* APDS-9960 register addresses */
let APDS9960_ENABLE = 0x80
let APDS9960_ATIME = 0x81
let APDS9960_WTIME = 0x83
let APDS9960_AILTL = 0x84
let APDS9960_AILTH = 0x85
let APDS9960_AIHTL = 0x86
let APDS9960_AIHTH = 0x87
let APDS9960_PILT = 0x89
let APDS9960_PIHT = 0x8B
let APDS9960_PERS = 0x8C
let APDS9960_CONFIG1 = 0x8D
let APDS9960_PPULSE = 0x8E
let APDS9960_CONTROL = 0x8F
let APDS9960_CONFIG2 = 0x90
let APDS9960_ID = 0x92
let APDS9960_STATUS = 0x93
let APDS9960_CDATAL = 0x94
let APDS9960_CDATAH = 0x95
let APDS9960_RDATAL = 0x96
let APDS9960_RDATAH = 0x97
let APDS9960_GDATAL = 0x98
let APDS9960_GDATAH = 0x99
let APDS9960_BDATAL = 0x9A
let APDS9960_BDATAH = 0x9B
let APDS9960_PDATA = 0x9C
let APDS9960_POFFSET_UR = 0x9D
let APDS9960_POFFSET_DL = 0x9E
let APDS9960_CONFIG3 = 0x9F
let APDS9960_GPENTH = 0xA0
let APDS9960_GEXTH = 0xA1
let APDS9960_GCONF1 = 0xA2
let APDS9960_GCONF2 = 0xA3
let APDS9960_GOFFSET_U = 0xA4
let APDS9960_GOFFSET_D = 0xA5
let APDS9960_GOFFSET_L = 0xA7
let APDS9960_GOFFSET_R = 0xA9
let APDS9960_GPULSE = 0xA6
let APDS9960_GCONF3 = 0xAA
let APDS9960_GCONF4 = 0xAB
let APDS9960_GFLVL = 0xAE
let APDS9960_GSTATUS = 0xAF
let APDS9960_IFORCE = 0xE4
let APDS9960_PICLEAR = 0xE5
let APDS9960_CICLEAR = 0xE6
let APDS9960_AICLEAR = 0xE7
let APDS9960_GFIFO_U = 0xFC
let APDS9960_GFIFO_D = 0xFD
let APDS9960_GFIFO_L = 0xFE
let APDS9960_GFIFO_R = 0xFF

/* Bit fields */
let APDS9960_PON = 0b00000001
let APDS9960_AEN = 0b00000010
let APDS9960_PEN = 0b00000100
let APDS9960_WEN = 0b00001000
let APSD9960_AIEN = 0b00010000
let APDS9960_PIEN = 0b00100000
let APDS9960_GEN = 0b01000000
let APDS9960_GVALID = 0b00000001

/* On/Off definitions */
let OFF = 0
let ON = 1

/* Acceptable parameters for setMode */
let POWER = 0
let AMBIENT_LIGHT = 1
let PROXIMITY = 2
let WAIT = 3
let AMBIENT_LIGHT_INT = 4
let PROXIMITY_INT = 5
let GESTURE = 6
let ALL = 7

/* LED Drive values */
let LED_DRIVE_100MA = 0
let LED_DRIVE_50MA = 1
let LED_DRIVE_25MA = 2
let LED_DRIVE_12_5MA = 3

/* Proximity Gain (PGAIN) values */
let PGAIN_1X = 0
let PGAIN_2X = 1
let PGAIN_4X = 2
let PGAIN_8X = 3

/* ALS Gain (AGAIN) values */
let AGAIN_1X = 0
let AGAIN_4X = 1
let AGAIN_16X = 2
let AGAIN_64X = 3

/* Gesture Gain (GGAIN) values */
let GGAIN_1X = 0
let GGAIN_2X = 1
let GGAIN_4X = 2
let GGAIN_8X = 3

/* LED Boost values */
let LED_BOOST_100 = 0
let LED_BOOST_150 = 1
let LED_BOOST_200 = 2
let LED_BOOST_300 = 3

/* Gesture wait time values */
let GWTIME_0MS = 0
let GWTIME_2_8MS = 1
let GWTIME_5_6MS = 2
let GWTIME_8_4MS = 3
let GWTIME_14_0MS = 4
let GWTIME_22_4MS = 5
let GWTIME_30_8MS = 6
let GWTIME_39_2MS = 7

/* Default values */
let DEFAULT_ATIME = 219     // 103ms
let DEFAULT_WTIME = 246     // 27ms
let DEFAULT_PROX_PPULSE = 0x87    // 16us, 8 pulses
let DEFAULT_GESTURE_PPULSE = 0x89    // 16us, 10 pulses
let DEFAULT_POFFSET_UR = 0       // 0 offset
let DEFAULT_POFFSET_DL = 0       // 0 offset      
let DEFAULT_CONFIG1 = 0x60    // No 12x wait (WTIME) factor
let DEFAULT_LDRIVE = LED_DRIVE_100MA
let DEFAULT_PGAIN = PGAIN_4X
let DEFAULT_AGAIN = AGAIN_4X
let DEFAULT_PILT = 0       // Low proximity threshold
let DEFAULT_PIHT = 50      // High proximity threshold
let DEFAULT_AILT = 0xFFFF  // Force interrupt for calibration
let DEFAULT_AIHT = 0
let DEFAULT_PERS = 0x11    // 2 consecutive prox or ALS for int.
let DEFAULT_CONFIG2 = 0x01    // No saturation interrupts or LED boost  
let DEFAULT_CONFIG3 = 0       // Enable all photodiodes, no SAI
let DEFAULT_GPENTH = 40      // Threshold for entering gesture mode
let DEFAULT_GEXTH = 30      // Threshold for exiting gesture mode    
let DEFAULT_GCONF1 = 0x40    // 4 gesture events for int., 1 for exit
let DEFAULT_GGAIN = GGAIN_4X
let DEFAULT_GLDRIVE = LED_DRIVE_100MA
let DEFAULT_GWTIME = GWTIME_2_8MS
let DEFAULT_GOFFSET = 0       // No offset scaling for gesture mode
let DEFAULT_GPULSE = 0xC9    // 32us, 10 pulses
let DEFAULT_GCONF3 = 0       // All photodiodes active during gesture
let DEFAULT_GIEN = 0       // Disable gesture interrupts

/* Direction definitions */
enum DIR {
    DIR_NONE,
    DIR_RIGHT,
    DIR_LEFT,
    DIR_UP,
    DIR_DOWN,
    DIR_NEAR,
    DIR_FAR,
    DIR_ALL
}

/* State definitions */
enum STATE {
    NA_STATE,
    NEAR_STATE,
    FAR_STATE,
    ALL_STATE
}

let gesture_ud_delta: number;
let gesture_lr_delta: number;
let gesture_ud_count: number;
let gesture_lr_count: number;
let gesture_near_count: number;
let gesture_far_count: number;
let gesture_state: number;
let gesture_motion: number;

/**
 * Brickcell Gestures
 */
enum BrickcellGesture {
    //% Right
    Right = 1,
    //% Left
    Left = 2,
    //% Up
    Up = 3,
    //% Down
    Down = 4,
}






//% weight=100 color=#993366 icon="\uf2db" block="One:Bit"
namespace One_Bit {

    // Define custom enums for digital pins
    export enum DigitalPinPrime {
        //% block="P0"
        P0 = DigitalPin.P0,
        //% block="P1"
        P1 = DigitalPin.P1,
        //% block="P2"
        P2 = DigitalPin.P2,
        //% block="P3"
        P3 = DigitalPin.P3,
        //% block="P4"
        P4 = DigitalPin.P4,
        //% block="P9"
        P9 = DigitalPin.P9,
        //% block="P10"
        P10 = DigitalPin.P10,
        //% block="P13"
        P13 = DigitalPin.P13,
        //% block="P14"
        P14 = DigitalPin.P14,
        //% block="P15"
        P15 = DigitalPin.P15,
        //% block="P19"
        P19 = DigitalPin.P19,
        //% block="P20"
        P20 = DigitalPin.P20
    }

    // Define custom enums for analog pins
    export enum AnalogPinPrime {
        //% block="P0"
        P0 = AnalogPin.P0,
        //% block="P1"
        P1 = AnalogPin.P1,
        //% block="P2"
        P2 = AnalogPin.P2,
        //% block="P3"
        P3 = AnalogPin.P3,
        //% block="P4"
        P4 = AnalogPin.P4,
        //% block="P10"
        P10 = AnalogPin.P10
    }


    // Enum for PWM pins
    export enum PWM {
        //% block="P0"
        P0 = DigitalPin.P0,
        //% block="P1"
        P1 = DigitalPin.P1,
        //% block="P2"
        P2 = DigitalPin.P2,
        //% block="P8"
        P8 = DigitalPin.P8,
        //% block="P12"
        P12 = DigitalPin.P12,
        //% block="P13"
        P13 = DigitalPin.P13,
        //% block="P14"
        P14 = DigitalPin.P14,
        //% block="P15"
        P15 = DigitalPin.P15,
        //% block="P16"
        P16 = DigitalPin.P16
    }


    ////////////////////
    //  PRIME BLOCKS  //
    ////////////////////

    // Function for reading a digital value from a pin
    //% subcategory="Prime"
    //% group="Digital Pins"
    //% weight=150 blockGap=8
    //% blockId="digital_read"
    //% block="read digital pin %pin"
    export function digitalRead(pin: DigitalPinPrime): number {
        return pins.digitalReadPin(pin);
    }

    // Function for writing a digital value to a pin
    //% subcategory="Prime"
    //% group="Digital Pins"
    //% blockId="digital_write"
    //% weight=140 blockGap= 50
    //% block="write digital pin %pin |to %value"
    export function digitalWrite(pin: DigitalPinPrime, value: number): void {
        pins.digitalWritePin(pin, value);
    }

    // Function for reading an analog value from a pin
    //% subcategory="Prime"
    //% group="Analog Pins"
    //% blockId="analog_read"
    //% weight=130 blockGap=8
    //% block="read analog pin %pin"
    export function analogRead(pin: AnalogPinPrime): number {
        return pins.analogReadPin(pin);
    }

    // Function for writing an analog value to a pin
    //% subcategory="Prime"
    //% group="Analog Pins"
    //% weight=120 blockGap=8
    //% blockId="analog_write"
    //% block="write analog pin %pin |to %value "
    //% value.min=0 value.max=1023
    export function analogWrite(pin: AnalogPinPrime, value: number): void {
        pins.analogWritePin(pin, value);
    }



    let primeBuffer: Buffer = null; // LED data buffer
    let primeNumLeds: number = 12;  // Number of LEDs
    let primeBrightness: number = 255; // Default brightness


    /**
     * Initialize the Prime
     * @param numLeds number of LEDs in the strip
     */
    //% subcategory="Prime"
    //% blockId="one_bit_prime_initialize"
    //% group="Neo_Color"
    //% block="initialize Prime with %numLeds|LEDs"
    //% weight=150 blockGap=8
    //% blockNamespace="One_Bit"
    export function initializePrime(numLeds: number): void {
        primeNumLeds = numLeds;
        primeBuffer = control.createBuffer(numLeds * 3);
        clearPrime(); // Ensure all LEDs start off
    }

    /**
     * Show data on the LEDs
     */
    function showPrimeBuffer(): void {
        if (primeBuffer) {
            light.sendWS2812Buffer(primeBuffer, DigitalPin.P16);
        }
    }

    /**
     * Show rainbow colors on the strip
     */
    //% subcategory="Prime"
    //% group="Neo_Color"
    //% blockId="one_bit_prime_show_rainbow"
    //% block="show Prime"
    //% weight=140 blockGap=8
    export function showPrime(): void {
        if (primeBuffer) {
            for (let i = 0; i < primeNumLeds; i++) {
                let angle = (i / primeNumLeds) * 2 * Math.PI;
                let red = Math.max(0, Math.sin(angle + (1 / 3) * Math.PI) * 127 + 128);
                let green = Math.max(0, Math.sin(angle + (2 / 3) * Math.PI) * 127 + 128);
                let blue = Math.max(0, Math.sin(angle + (4 / 3) * Math.PI) * 127 + 128);
                setPrimeLedColorRaw(i, Math.floor(red), Math.floor(green), Math.floor(blue));
            }
            showPrimeBuffer();
        }
    }

    /**
     * Clear all LEDs on the strip
     */
    //% subcategory="Prime"
    //% group="Neo_Color"
    //% blockId="one_bit_prime_clear"
    //% block="clear Prime"
    //% weight=130 blockGap=8
    export function clearPrime(): void {
        if (primeBuffer) {
            primeBuffer.fill(0);
            showPrimeBuffer();
        }
    }


    /**
     * Set color of all LEDs on the strip
     * @param color the color to set
     */
    //% subcategory="Prime"
    //% value.defl='#ff0000'
    //% group="Neo_Color"
    //% blockId="one_bit_prime_set_color"
    //% block="set Prime color to %color"
    //% weight=120 blockGap=8
    //% color.shadow="brightColorNumberPicker"
    export function setPrimeColor(color: number): void {
        let red = (color >> 16) & 0xFF;
        let green = (color >> 8) & 0xFF;
        let blue = color & 0xFF;
        for (let i = 0; i < primeNumLeds; i++) {
            setPrimeLedColorRaw(i, red, green, blue);
        }
        showPrimeBuffer();
    }

    /**
 * Set color of a specific LED on the strip
 * @param ledIndex the index of the LED to change
 * @param color the color to set
 */
    //% subcategory="Prime"
    //% value.defl='#FFFFFF'
    //% group="Neo_Color"
    //% blockId="one_bit_prime_set_led_color"
    //% block="set Prime LED %ledIndex|color to %color"
    //% weight=110 blockGap=8
    //% color.shadow="brightColorNumberPicker"
    export function setPrimeLedColor(ledIndex: number, color: number): void {
        if (primeBuffer && ledIndex < primeNumLeds) {
            let red = (color >> 16) & 0xFF;
            let green = (color >> 8) & 0xFF;
            let blue = color & 0xFF;

            let index = ledIndex * 3; // Calculate position in buffer
            primeBuffer.setUint8(index, (red * primeBrightness) >> 8); // Scale brightness
            primeBuffer.setUint8(index + 1, (green * primeBrightness) >> 8); // Scale brightness
            primeBuffer.setUint8(index + 2, (blue * primeBrightness) >> 8); // Scale brightness

            showPrimeBuffer(); // Send updated buffer to the LEDs
        }
    }


    /**
     * Set brightness of the strip
     * @param brightness brightness level (0-255)
     */
    //% subcategory="Prime"
    //% group="Neo_Color"
    //% blockId="one_bit_prime_set_brightness"
    //% block="set Prime brightness to %brightness"
    //% weight=100 blockGap=8
    export function setPrimeBrightness(brightness: number): void {
        primeBrightness = Math.clamp(0, 255, brightness);
        applyBrightness(); // Apply brightness scaling to the buffer
        showPrimeBuffer(); // Update LEDs with adjusted brightness
    }

    /**
     * Apply brightness scaling to the buffer
     */
    function applyBrightness(): void {
        if (!primeBuffer) return;

        for (let i = 0; i < primeNumLeds; i++) {
            let index = i * 3;
            primeBuffer[index] = (primeBuffer[index] * primeBrightness) >> 8; // Scale Green
            primeBuffer[index + 1] = (primeBuffer[index + 1] * primeBrightness) >> 8; // Scale Red
            primeBuffer[index + 2] = (primeBuffer[index + 2] * primeBrightness) >> 8; // Scale Blue
        }
    }
    /**
     * Set color of a specific LED using raw RGB values
     * @param ledIndex the index of the LED to change
     * @param red Red value (0-255)
     * @param green Green value (0-255)
     * @param blue Blue value (0-255)
     */
    function setPrimeLedColorRaw(index: number, red: number, green: number, blue: number): void {
        if (!primeBuffer || index >= primeNumLeds) return;

        let brightnessScale = primeBrightness / 255; // Scale factor for brightness
        primeBuffer[index * 3 + 0] = Math.floor(green * brightnessScale); // GRB: Green
        primeBuffer[index * 3 + 1] = Math.floor(red * brightnessScale);   // GRB: Red
        primeBuffer[index * 3 + 2] = Math.floor(blue * brightnessScale);  // GRB: Blue
    }

    /**
     * Show a gradient pattern on the strip
     * @param startHue the starting hue value (0-360)
     * @param length the length of the gradient in number of LEDs
     * @param fromColor starting color of the gradient
     * @param toColor ending color of the gradient
     */
    //% subcategory="Prime"
    //% value.defl="#FFFFFF"
    //% group="Neo_Color"
    //% blockId="one_bit_prime_gradient"
    //% block="show gradient with start hue %startHue|length %length|from %fromColor|to %toColor"
    //% weight=90 blockGap=8
    //% fromColor.shadow="brightColorNumberPicker" 
    //% toColor.shadow="brightColorNumberPicker"
    export function showPrimeGradient(startHue: number, length: number, fromColor: number, toColor: number): void {
        for (let i = 0; i < length; i++) {
            let blendColor = blend(fromColor, toColor, i / length);
            setLedColor(i, blendColor); // Custom function to set LED color
        }
        updateLeds(); // Custom function to apply changes
    }


    /**
     * Helper function to blend two colors
     * @param color1 the first color
     * @param color2 the second color
     * @param blend the blend factor between the two colors (0-1)
     */
    function blend(color1: number, color2: number, blend: number): number {
        let r1 = (color1 >> 16) & 0xFF;
        let g1 = (color1 >> 8) & 0xFF;
        let b1 = color1 & 0xFF;

        let r2 = (color2 >> 16) & 0xFF;
        let g2 = (color2 >> 8) & 0xFF;
        let b2 = color2 & 0xFF;

        let r = Math.round(r1 * (1 - blend) + r2 * blend);
        let g = Math.round(g1 * (1 - blend) + g2 * blend);
        let b = Math.round(b1 * (1 - blend) + b2 * blend);

        return (r << 16) | (g << 8) | b;
    }



    /**
     * Custom color picker with all specified colors
     */
    //% subcategory="Prime"
    //% value.defl='#CCFF00'
    //% group="Neo_Color"
    //% weight=80 blockGap=20
    //% blockId=brightColorNumberPicker block="%value"
    //% shim=TD_ID colorSecondary="#FFFFFF"
    //% value.fieldEditor="colornumber" value.fieldOptions.decompileLiterals=true
    //% value.fieldOptions.colours='["#CCFF00","#CCCC00","#CC9900","#CC6600","#CC3300","#CC0000","#660000","#663300","#666600","#669900","#66CC00","#66FF00","#00FF00","#00CC00","#009900","#006600","#003300","#000000","#CCFF33","#CCCC33","#CC9933","#CC6633","#CC3333","#CC0033","#660033","#663333","#666633","#669933","#66CC33","#66FF33","#00FF33","#00CC33","#009933","#006633","#003333","#000033","#CCFF66","#CCCC66","#CC9966","#CC6666","#CC3366","#CC0066","#660066","#663366","#666666","#669966","#66CC66","#66FF66","#00FF66","#00CC66","#009966","#006666","#003366","#000066","#CCFF99","#CCCC99","#CC9999","#CC6699","#CC3399","#CC0099","#660099","#663399","#666699","#669999","#66CC99","#66FF99","#00FF99","#00CC99","#009999","#006699","#003399","#000099","#CCFFCC","#CCCCCC","#CC99CC","#CC66CC","#CC33CC","#CC00CC","#6600CC","#6633CC","#6666CC","#6699CC","#66CCCC","#66FFCC","#00FFCC","#00CCCC","#0099CC","#0066CC","#0033CC","#0000CC","#CCFFFF","#CCCCFF","#CC99FF","#CC66FF","#CC33FF","#CC00FF","#6600FF","#6633FF","#6666FF","#6699FF","#66CCFF","#66FFFF","#00FFFF","#00CCFF","#0099FF","#0066FF","#0033FF","#0000FF","#FFFFFF","#FFCCFF","#FF99FF","#FF66FF","#FF33FF","#FF00FF","#9900FF","#9933FF","#9966FF","#9999FF","#99CCFF","#99FFFF","#33FFFF","#33CCFF","#3399FF","#3366FF","#3333FF","#3300FF","#FFFFCC","#FFCCCC","#FF99CC","#FF66CC","#FF33CC","#FF00CC","#9900CC","#9933CC","#9966CC","#9999CC","#99CCCC","#99FFCC","#33FFCC","#33CCCC","#3399CC","#3366CC","#3333CC","#3300CC","#FFFF99","#FFCC99","#FF9999","#FF6699","#FF3399","#FF0099","#990099","#993399","#996699","#999999","#99CC99","#99FF99","#33FF99","#33CC99","#339999","#336699","#333399","#330099","#FFFF66","#FFCC66","#FF9966","#FF6666","#FF3366","#FF0066","#990066","#993366","#996666","#999966","#99CC66","#99FF66","#33FF66","#33CC66","#339966","#336666","#333366","#330066","#FFFF33","#FFCC33","#FF9933","#FF6633","#FF3333","#FF0033","#990033","#993333","#996633","#999933","#99CC33","#99FF33","#33FF33","#33CC33","#339933","#336633","#333333","#330033"]'
    //% value.fieldOptions.columns=18 value.fieldOptions.className='rgbColorPicker'
    export function __colorNumberPicker(value: number): number {
        return value;
    }


    /**
     * Get a random color
     */
    //% blockId="one_bit_prime_random_color"
    //% value.defl='#ff0000' 
    //% group="Neo_Color" weight=70
    //% block="random color"
    //% subcategory="Prime"
    export function primeRandomColor(): number {
        return Math.randomRange(0, 0xFFFFFF);
    }


    /**
     * Convert RGB values to a color number
     * @param r Red value (0-255)
     * @param g Green value (0-255)
     * @param b Blue value (0-255)
     */
    //% blockId="one_bit_prime_rgb_to_color"
    //% value.defl='#ff0000' 
    //% group="Neo_Color" weight=60
    //% block="R %r|G %g|B %b"
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //% subcategory="Prime"
    export function primeRgbToColor(r: number, g: number, b: number): number {
        return (r << 16) | (g << 8) | b;
    }

    /**
     * Convert HSL values to a color number
     * @param h Hue (0-360)
     * @param s Saturation (0-100)
     * @param l Luminosity (0-100)
     */
    //% blockId="one_bit_prime_hsl_to_color"
    //% value.defl='#ff0000' 
    //% group="Neo_Color" weight=50
    //% block="hue %h|saturation %s|luminosity %l"
    //% h.min=0 h.max=360
    //% s.min=0 s.max=100
    //% l.min=0 l.max=100
    //% subcategory="Prime"
    export function primeHslToColor(h: number, s: number, l: number): number {
        return hslToRgb(h, s, l); // Custom function for HSL to RGB
    }

    /**
 * Convert HSL values to RGB
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Luminosity (0-100)
 * @returns A packed RGB number (24-bit)
 */
    function hslToRgb(h: number, s: number, l: number): number {
        h = h % 360; // Ensure hue wraps around 360
        s = s / 100; // Convert saturation to a decimal
        l = l / 100; // Convert luminosity to a decimal

        const c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
        const x = c * (1 - Math.abs((h / 60) % 2 - 1)); // Second largest component
        const m = l - c / 2;

        let r = 0, g = 0, b = 0;

        if (h >= 0 && h < 60) {
            r = c; g = x; b = 0;
        } else if (h >= 60 && h < 120) {
            r = x; g = c; b = 0;
        } else if (h >= 120 && h < 180) {
            r = 0; g = c; b = x;
        } else if (h >= 180 && h < 240) {
            r = 0; g = x; b = c;
        } else if (h >= 240 && h < 300) {
            r = x; g = 0; b = c;
        } else if (h >= 300 && h < 360) {
            r = c; g = 0; b = x;
        }

        // Convert RGB components to 8-bit values and pack into a single integer
        const red = Math.round((r + m) * 255);
        const green = Math.round((g + m) * 255);
        const blue = Math.round((b + m) * 255);

        return (red << 16) | (green << 8) | blue;
    }


    /**
     * Custom function to set a specific LED's color
     * @param index LED index
     * @param color RGB color
     */
    function setLedColor(index: number, color: number): void {
        // Send the appropriate signal to the LEDs
        let r = (color >> 16) & 0xFF;
        let g = (color >> 8) & 0xFF;
        let b = color & 0xFF;

        // Logic to send r, g, and b to the specific LED
        sendSignalToLed(index, r, g, b);
    }

    /**
     * Function to send RGB signal to a specific LED
     */
    function sendSignalToLed(index: number, r: number, g: number, b: number): void {
        // Use custom bit-banging logic or timing logic here
    }

    /**
     * Function to apply updates to the LEDs
     */
    function updateLeds(): void {
        // Trigger any necessary latch or update commands for the LEDs
    }



    ////////////////////
    // Sensors //
    ////////////////////

    // Enum for Distance Units
    export enum Unit {
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches
    }

    /**
     * Initialize Ultrasonic Sensor and get distance
     * @param trigPin TRIG pin of the sensor
     * @param echoPin ECHO pin of the sensor
     * @param unit Desired distance unit
     * @param maxCmDistance Maximum measurable distance in centimeters (default is 500)
     */
    //% blockId="initialize_and_get_ultrasonic_distance" 
    //% block="ultrasonic on trig %trigPin|echo %echoPin|distance in %unit"
    //% subcategory="Sensors"
    //% group="Ultrasonic Sensor"
    //% trigPin.defl=PWM.P0
    //% echoPin.defl=PWM.P1
    //% unit.defl=Unit.Centimeters
    //% weight=100 blockGap=8
    export function initializeAndGetUltrasonicDistance(
        trigPin: PWM,
        echoPin: PWM,
        unit: Unit,
        maxCmDistance = 500
    ): number {
        // Send pulse to trigger ultrasonic sensor
        pins.setPull(trigPin, PinPullMode.PullNone);
        pins.digitalWritePin(trigPin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trigPin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trigPin, 0);

        // Read pulse duration from echo pin
        const d = pins.pulseIn(echoPin, PulseValue.High, maxCmDistance * 58);

        // Handle case where no echo is received
        if (d === 0) {
            return -1; // Return -1 for no response
        }

        // Convert pulse duration to distance
        switch (unit) {
            case Unit.Centimeters:
                return Math.idiv(d, 58); // Convert to cm
            case Unit.Inches:
                return Math.idiv(d, 148); // Convert to inches
            default:
                return -1;
        }
    }

    ////////////////////////////////////////////////////////////////////////////


    export enum tempUnit {
        //% block="Celsius (*C)"
        celsius,
        //% block="Fahrenheit (*F)"
        fahrenheit,
    }

    let _temperature: number = -999.0
    let _humidity: number = -999.0

    /**
    * Read temperature data from DHT11 sensor.
    * @param pin the pin number where the DHT11 data pin is connected
    * @param unit the temperature unit to read (Celsius or Fahrenheit)
    */
    //% blockId="dht11_temperature"
    //% block="read Temperature on Pin $pin with Unit $unit"
    //% subcategory="Sensors"
    //% group="DHT11"
    //% pin.defl=DigitalPin.P0
    //% unit.defl=celsius
    export function readTemperature(pin: DigitalPin, unit: tempUnit): number {
        // Initialize sensor and read data
        let resultArray: number[] = []
        let dataArray: boolean[] = []
        let startTime = input.runningTimeMicros()

        for (let i = 0; i < 40; i++) dataArray.push(false)
        for (let i = 0; i < 5; i++) resultArray.push(0)

        pins.digitalWritePin(pin, 0)
        basic.pause(18)

        pins.setPull(pin, PinPullMode.PullUp)
        pins.digitalReadPin(pin)
        control.waitMicros(40)

        // Sensor response
        if (pins.digitalReadPin(pin) == 0) {
            while (pins.digitalReadPin(pin) == 0);
            while (pins.digitalReadPin(pin) == 1);

            // Read data
            for (let i = 0; i < 40; i++) {
                while (pins.digitalReadPin(pin) == 1);
                while (pins.digitalReadPin(pin) == 0);
                control.waitMicros(28)
                if (pins.digitalReadPin(pin) == 1) dataArray[i] = true
            }

            // Convert byte data to integer
            for (let i = 0; i < 5; i++)
                for (let j = 0; j < 8; j++)
                    if (dataArray[8 * i + j]) resultArray[i] += 2 ** (7 - j)

            // Temperature and humidity values
            _humidity = resultArray[0] + resultArray[1] / 100
            _temperature = resultArray[2] + resultArray[3] / 100

            // Convert to Fahrenheit if needed
            if (unit == tempUnit.fahrenheit) {
                _temperature = _temperature * 9 / 5 + 32
            }
        }

        return _temperature
    }

    /**
    * Read humidity data from DHT11 sensor.
    * @param pin the pin number where the DHT11 data pin is connected
    */
    //% blockId="dht11_humidity"
    //% block="read Humidity on Pin $pin"
    //% subcategory="Sensors"
    //% group="DHT11"
    //% pin.defl=DigitalPin.P0
    export function readHumidity(pin: DigitalPin): number {
        // Initialize sensor and read data
        let resultArray: number[] = []
        let dataArray: boolean[] = []
        let startTime = input.runningTimeMicros()

        for (let i = 0; i < 40; i++) dataArray.push(false)
        for (let i = 0; i < 5; i++) resultArray.push(0)

        pins.digitalWritePin(pin, 0)
        basic.pause(18)

        pins.setPull(pin, PinPullMode.PullUp)
        pins.digitalReadPin(pin)
        control.waitMicros(40)

        // Sensor response
        if (pins.digitalReadPin(pin) == 0) {
            while (pins.digitalReadPin(pin) == 0);
            while (pins.digitalReadPin(pin) == 1);

            // Read data
            for (let i = 0; i < 40; i++) {
                while (pins.digitalReadPin(pin) == 1);
                while (pins.digitalReadPin(pin) == 0);
                control.waitMicros(28)
                if (pins.digitalReadPin(pin) == 1) dataArray[i] = true
            }

            // Convert byte data to integer
            for (let i = 0; i < 5; i++)
                for (let j = 0; j < 8; j++)
                    if (dataArray[8 * i + j]) resultArray[i] += 2 ** (7 - j)

            // Humidity value
            _humidity = resultArray[0] + resultArray[1] / 100
            _temperature = resultArray[2] + resultArray[3] / 100
        }

        return _humidity
    }

    //////////////////////////////////////////////////////////////////////////


    /**
     * Get the digital value from the IR sensor (1 for detection, 0 for no detection) on the selected pin.
     * @param pin the digital pin where the IR sensor is connected
     */
    //% subcategory="Sensors"
    //% group="IR Sensor"
    //% blockId="ir_sensor_digital"
    //% block="ir Sensor on Digital Pin %pin"
    //% pin.defl=DigitalPinPrime.P0
    //% weight=90 blockGap=20
    export function readIRSensorDigital(pin: DigitalPinPrime): number {
        // Read the current state of the pin
        let rawValue = pins.digitalReadPin(pin);

        // Invert the value since 0 means detected and 1 means not detected
        let invertedValue = rawValue === 0 ? 1 : 0;

        // Reset the pin state (pull back to neutral to avoid latch state)
        pins.setPull(pin, PinPullMode.PullNone);

        return invertedValue;
    }



    /**
     * Get the analog value from the IR sensor on the selected pin.
     * @param pin the analog pin where the IR sensor is connected
     */
    //% subcategory="Sensors"
    //% group="IR Sensor"
    //% blockId="ir_sensor_analog"
    //% block="ir Sensor on Analog Pin %pin"
    //% pin.defl=AnalogPinPrime.P0
    //% weight=100 blockGap=20
    export function readIRSensorAnalog(pin: AnalogPinPrime): number {
        // Read the value from the specified analog pin
        const value = pins.analogReadPin(pin);
        return value; // Return the analog value (0-1023)
    }

    ////////////////////////////////////////////////////////////////////////////

    // Function to get the digital value of the LDR sensor with reset
    //% subcategory="Sensors"
    //% group="LDR Sensor"
    //% blockId="ldr_digital_value_reset"
    //% block="ldr Sensor on Digital Pin %pin"
    //% weight=180 blockGap=20
    export function getLDRSensorDigitalValueReset(pin: DigitalPinPrime): number {
        // Ensure the pin is set to input mode before reading
        pins.setPull(pin, PinPullMode.PullNone);

        // Read the digital value from the pin (either 0 or 1)
        let value = pins.digitalReadPin(pin);

        // Reset the pin state by reinitializing it as a digital input again
        pins.setPull(pin, PinPullMode.PullNone); // Reset state by disabling pull-up/down

        // Return the value (0 or 1)
        return value;
    }

    // Function to read from an LDR sensor connected to an analog pin
    //% subcategory="Sensors"
    //% group="LDR Sensor"
    //% blockId="ldr_analog_value"
    //% block="ldr Sensor on Analog Pin %pin"
    //% weight=180 blockGap=20
    export function getLDRSensorAnalogValue(pin: AnalogPinPrime): number {
        // Read and return the inverted analog value (1023 - value)
        let sensorValue = pins.analogReadPin(pin);
        return 1023 - sensorValue;  // Invert the value (higher value for dark, lower for light)
    }



    /////////////////////////////////////////////////////////////////////////

    // Function to read the moisture sensor value
    //% subcategory="Sensors"
    //% group="Moisture Sensor"
    //% blockId="moisture_sensor_value"
    //% block="moisture sensor value on Pin %pin"
    //% weight=180 blockGap=20
    export function getMoistureSensorValue(pin: AnalogPinPrime): number {
        // Read and return the analog value from the specified pin
        return pins.analogReadPin(pin);
    }
////////////////////////////////////////////////////////////////////////////



    const gestureEventId = 3100;
    let lastGesture = 0;


    /* Container for gesture data */
    export class gesture_data_type {
        u_data: Buffer;
        d_data: Buffer;
        l_data: Buffer;
        r_data: Buffer;
        index: number;
        total_gestures: number;
        in_threshold: number;
        out_threshold: number;
    }

    let gesture_data = new gesture_data_type;
    let data_buf: Buffer = pins.createBuffer(128);


    function APDS9960ReadReg(addr: number): number {
        let buf: Buffer = pins.createBuffer(1);
        buf[0] = addr;
        pins.i2cWriteBuffer(0x39, buf, false);
        buf = pins.i2cReadBuffer(0x39, 1, false);
        return buf[0];
    }

    function APDS9960WriteReg(addr: number, cmd: number) {
        let buf: Buffer = pins.createBuffer(2);

        buf[0] = addr;
        buf[1] = cmd;

        pins.i2cWriteBuffer(0x39, buf, false);
    }

    function readi2c(register: number): number {
        return pins.i2cReadNumber(register, NumberFormat.UInt8LE);
    }

    /**
     * @brief Reads a block (array) of bytes from the I2C device and register
     *
     * @param[in] reg the register to read from
     * @param[out] val pointer to the beginning of the data
     * @param[in] len number of bytes to read
     * @return Number of bytes read. -1 on read error.
     */
    function APDS9960ReadRegBlock(addr: number, len: number): number {
        let i: number = 0;
        let y: number = 0;

        for (let i = 0; i < len; i = i + 4) {

            data_buf[i] = readi2c(0xFc);
            data_buf[i + 1] = readi2c(0xFd);
            data_buf[i + 2] = readi2c(0xFe);
            data_buf[i + 3] = readi2c(0xFf);
            basic.pause(10);
            if (DEBUG) {
                serial.writeLine(data_buf[i].toString() + " ; "
                    + data_buf[i + 1].toString() + " ; "
                    + data_buf[i + 2].toString() + " ; "
                    + data_buf[i + 3].toString() + " ; ");
            }
        }


        return len;
    }

    function getMode(): number {
        let enable_value: number;

        /* Read current ENABLE register */
        enable_value = APDS9960ReadReg(APDS9960_ENABLE);
        return enable_value;
    }

    function setMode(mode: number, enable: number) {
        let reg_val: number;
        /* Read current ENABLE register */
        reg_val = getMode();
        /* Change bit(s) in ENABLE register */
        enable = enable & 0x01;
        if (mode >= 0 && mode <= 6) {
            if (enable) {
                reg_val |= (1 << mode);
            } else {
                //reg_val &= ~(1 << mode);
                reg_val = 0x00;
            }
        } else if (mode == ALL) {
            if (enable) {
                reg_val = 0x7F;
            } else {
                reg_val = 0x00;
            }
        }

        /* Write value back to ENABLE register */
        APDS9960WriteReg(APDS9960_ENABLE, reg_val);
    }

    /**
     * @brief Sets the gain of the photodiode during gesture mode
     *
     * Value    Gain
     *   0       1x
     *   1       2x
     *   2       4x
     *   3       8x
     *
     * @param[in] gain the value for the photodiode gain
     * @return True if operation successful. False otherwise.
     */
    function setGestureGain(gain: number) {
        let val: number;

        /* Read value from GCONF2 register */
        val = APDS9960ReadReg(APDS9960_GCONF2);

        /* Set bits in register to given value */
        gain &= 0b00000011;
        gain = gain << 5;
        val &= 0b10011111;
        val |= gain;

        /* Write register value back into GCONF2 register */
        APDS9960WriteReg(APDS9960_GCONF2, val);
    }

    /**
     * @brief Sets the LED drive current during gesture mode
     *
     * Value    LED Current
     *   0        100 mA
     *   1         50 mA
     *   2         25 mA
     *   3         12.5 mA
     *
     * @param[in] drive the value for the LED drive current
     * @return True if operation successful. False otherwise.
     */
    function setGestureLEDDrive(drive: number) {
        let val: number;

        /* Read value from GCONF2 register */
        val = APDS9960ReadReg(APDS9960_GCONF2);

        /* Set bits in register to given value */
        drive &= 0b00000011;
        drive = drive << 3;
        val &= 0b11100111;
        val |= drive;

        /* Write register value back into GCONF2 register */
        APDS9960WriteReg(APDS9960_GCONF2, val);
    }

    /**
     * @brief Sets the LED current boost value
     *
     * Value  Boost Current
     *   0        100%
     *   1        150%
     *   2        200%
     *   3        300%
     *
     * @param[in] drive the value (0-3) for current boost (100-300%)
     * @return True if operation successful. False otherwise.
     */
    function setLEDBoost(boost: number) {
        let val: number;

        /* Read value from CONFIG2 register */
        val = APDS9960ReadReg(APDS9960_CONFIG2);

        /* Set bits in register to given value */
        boost &= 0b00000011;
        boost = boost << 4;
        val &= 0b11001111;
        val |= boost;

        /* Write register value back into CONFIG2 register */
        APDS9960WriteReg(APDS9960_CONFIG2, val);
    }

    /**
     * @brief Sets the time in low power mode between gesture detections
     *
     * Value    Wait time
     *   0          0 ms
     *   1          2.8 ms
     *   2          5.6 ms
     *   3          8.4 ms
     *   4         14.0 ms
     *   5         22.4 ms
     *   6         30.8 ms
     *   7         39.2 ms
     *
     * @param[in] the value for the wait time
     * @return True if operation successful. False otherwise.
     */
    function setGestureWaitTime(time: number) {
        let val: number;

        /* Read value from GCONF2 register */
        val = APDS9960ReadReg(APDS9960_GCONF2);

        /* Set bits in register to given value */
        time &= 0b00000111;
        val &= 0b11111000;
        val |= time;

        /* Write register value back into GCONF2 register */
        APDS9960WriteReg(APDS9960_GCONF2, val);
    }

    /**
     * @brief Turns gesture-related interrupts on or off
     *
     * @param[in] enable 1 to enable interrupts, 0 to turn them off
     * @return True if operation successful. False otherwise.
     */
    function setGestureIntEnable(enable: number) {
        let val: number;

        /* Read value from GCONF4 register */
        val = APDS9960ReadReg(APDS9960_GCONF4);

        /* Set bits in register to given value */
        enable &= 0b00000001;
        enable = enable << 1;
        val &= 0b11111101;
        val |= enable;

        /* Write register value back into GCONF4 register */
        APDS9960WriteReg(APDS9960_GCONF4, val);
    }

    /**
     * @brief Resets all the parameters in the gesture data member
     */
    function resetGestureParameters() {
        gesture_data.index = 0;
        gesture_data.total_gestures = 0;

        gesture_ud_delta = 0;
        gesture_lr_delta = 0;

        gesture_ud_count = 0;
        gesture_lr_count = 0;

        gesture_near_count = 0;
        gesture_far_count = 0;

        gesture_state = 0;
        gesture_motion = DIR.DIR_NONE;
    }

    /**
     * @brief Tells the state machine to either enter or exit gesture state machine
     *
     * @param[in] mode 1 to enter gesture state machine, 0 to exit.
     * @return True if operation successful. False otherwise.
     */
    function setGestureMode(mode: number) {
        let val: number;

        /* Read value from GCONF4 register */
        val = APDS9960ReadReg(APDS9960_GCONF4);

        /* Set bits in register to given value */
        mode &= 0b00000001;
        val &= 0b11111110;
        val |= mode;

        /* Write register value back into GCONF4 register */
        APDS9960WriteReg(APDS9960_GCONF4, val);
    }

    /**
     * Turn the APDS-9960 on
     *
     * @return True if operation successful. False otherwise.
     */
    function enablePower() {
        setMode(POWER, 1);
    }

    /**
     * @brief Starts the gesture recognition engine on the APDS-9960
     *
     * @param[in] interrupts true to enable hardware external interrupt on gesture
     * @return True if engine enabled correctly. False on error.
     */
    function enableGestureSensor(interrupts: boolean) {
        /* Enable gesture mode
        Set ENABLE to 0 (power off)
        Set WTIME to 0xFF
        Set AUX to LED_BOOST_300
        Enable PON, WEN, PEN, GEN in ENABLE 
        */
        resetGestureParameters();
        APDS9960WriteReg(APDS9960_WTIME, 0xFF);
        APDS9960WriteReg(APDS9960_PPULSE, DEFAULT_GESTURE_PPULSE);
        setLEDBoost(LED_BOOST_300);
        if (interrupts) {
            setGestureIntEnable(1);
        } else {
            setGestureIntEnable(0);
        }
        setGestureMode(1);
        enablePower();
        setMode(WAIT, 1)
        setMode(PROXIMITY, 1);
        setMode(GESTURE, 1);
    }

    function pads9960_init() {
        let aa = APDS9960ReadReg(0X92);
        if (aa == 0xAB) {
            APDS9960WriteReg(APDS9960_GPENTH, DEFAULT_GPENTH);//0x28
            APDS9960WriteReg(APDS9960_GEXTH, DEFAULT_GEXTH);//0x1e
            APDS9960WriteReg(APDS9960_GCONF1, DEFAULT_GCONF1);//0x40
            setGestureGain(DEFAULT_GGAIN);//0x41
            setGestureLEDDrive(DEFAULT_GLDRIVE);
            setGestureWaitTime(DEFAULT_GWTIME);
            APDS9960WriteReg(APDS9960_GOFFSET_U, DEFAULT_GOFFSET);
            APDS9960WriteReg(APDS9960_GOFFSET_D, DEFAULT_GOFFSET);
            APDS9960WriteReg(APDS9960_GOFFSET_L, DEFAULT_GOFFSET);
            APDS9960WriteReg(APDS9960_GOFFSET_R, DEFAULT_GOFFSET);
            APDS9960WriteReg(APDS9960_GPULSE, DEFAULT_GPULSE);//0xc9
            APDS9960WriteReg(APDS9960_GCONF3, DEFAULT_GCONF3);//00
            setGestureIntEnable(DEFAULT_GIEN);
        }

        if (0) {
            /* Gesture config register dump */
            let reg: number = 0x00;
            let val: number = 0x00;

            for (reg = 0x80; reg <= 0xAF; reg++) {
                if ((reg != 0x82) &&
                    (reg != 0x8A) &&
                    (reg != 0x91) &&
                    (reg != 0xA8) &&
                    (reg != 0xAC) &&
                    (reg != 0xAD)) {
                    val = APDS9960ReadReg(reg);
                    serial.writeLine(reg + ": 0x" + val);
                }
            }

            for (reg = 0xE4; reg <= 0xE7; reg++) {
                val = APDS9960ReadReg(reg);
                serial.writeLine(reg + ": 0x" + val);
            }

        }
        // serial.writeLine("init sensor finish");
    }

    /**
     * @brief Determines if there is a gesture available for reading
     *
     * @return True if gesture available. False otherwise.
     */
    function isGestureAvailable(): boolean {
        let val: number;

        /* Read value from GSTATUS register */
        val = APDS9960ReadReg(APDS9960_GSTATUS);
        /* Shift and mask out GVALID bit */
        val &= APDS9960_GVALID;

        /* Return true/false based on GVALID bit */
        if (val == 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @brief Processes the raw gesture data to determine swipe direction
     *
     * @return True if near or far state seen. False otherwise.
     */
    function processGestureData(): boolean {
        let u_first: number = 0;
        let d_first: number = 0;
        let l_first: number = 0;
        let r_first: number = 0;
        let u_last: number = 0;
        let d_last: number = 0;
        let l_last: number = 0;
        let r_last: number = 0;
        let ud_ratio_first: number;
        let lr_ratio_first: number;
        let ud_ratio_last: number;
        let lr_ratio_last: number;
        let ud_delta: number;
        let lr_delta: number;
        let i: number;

        /* If we have less than 4 total gestures, that's not enough */
        if (gesture_data.total_gestures <= 4) {
            return false;
        }

        /* Check to make sure our data isn't out of bounds */
        if ((gesture_data.total_gestures <= 32) && (gesture_data.total_gestures > 0)) {

            /* Find the first value in U/D/L/R above the threshold */
            for (i = 0; i < gesture_data.total_gestures; i++) {
                if ((gesture_data.u_data[i] > GESTURE_THRESHOLD_OUT) &&
                    (gesture_data.d_data[i] > GESTURE_THRESHOLD_OUT) &&
                    (gesture_data.l_data[i] > GESTURE_THRESHOLD_OUT) &&
                    (gesture_data.r_data[i] > GESTURE_THRESHOLD_OUT)) {

                    u_first = gesture_data.u_data[i];
                    d_first = gesture_data.d_data[i];
                    l_first = gesture_data.l_data[i];
                    r_first = gesture_data.r_data[i];
                    break;
                }
            }

            /* If one of the _first values is 0, then there is no good data */
            if ((u_first == 0) || (d_first == 0) || (l_first == 0) || (r_first == 0)) {

                return false;
            }
            /* Find the last value in U/D/L/R above the threshold */
            for (i = gesture_data.total_gestures - 1; i >= 0; i--) {


                if ((gesture_data.u_data[i] > GESTURE_THRESHOLD_OUT) &&
                    (gesture_data.d_data[i] > GESTURE_THRESHOLD_OUT) &&
                    (gesture_data.l_data[i] > GESTURE_THRESHOLD_OUT) &&
                    (gesture_data.r_data[i] > GESTURE_THRESHOLD_OUT)) {

                    u_last = gesture_data.u_data[i];
                    d_last = gesture_data.d_data[i];
                    l_last = gesture_data.l_data[i];
                    r_last = gesture_data.r_data[i];
                    break;
                }
            }
        }

        /* Calculate the first vs. last ratio of up/down and left/right */
        ud_ratio_first = ((u_first - d_first) * 100) / (u_first + d_first);
        lr_ratio_first = ((l_first - r_first) * 100) / (l_first + r_first);
        ud_ratio_last = ((u_last - d_last) * 100) / (u_last + d_last);
        lr_ratio_last = ((l_last - r_last) * 100) / (l_last + r_last);
        if (ud_ratio_first == 0 && lr_ratio_first == 0 && ud_ratio_last == 0 && lr_ratio_last == 0) {

            //pads9960_init();
            // enableGestureSensor(false);
        }
        if (DEBUG) {
            serial.writeLine("first Values: " + "U:" + u_first
                + " D:" + d_first
                + " L:" + l_first
                + " R:" + r_first);
            serial.writeLine("Last Values: " + "U:" + u_last
                + " D:" + d_last
                + " L:" + l_last
                + " R:" + r_last);
            serial.writeLine("Ratios: " + "UD Fi:" + ud_ratio_first
                + " UD La:" + ud_ratio_last
                + " LR Fi:" + lr_ratio_first
                + " LR La:" + lr_ratio_last);

        }

        /* Determine the difference between the first and last ratios */
        ud_delta = ud_ratio_last - ud_ratio_first;
        lr_delta = lr_ratio_last - lr_ratio_first;
        if (DEBUG) {
            serial.writeLine("Deltas: " + "UD: " + ud_delta + " LR: " + lr_delta);
        }

        /* Accumulate the UD and LR delta values */
        gesture_ud_delta += ud_delta;
        gesture_lr_delta += lr_delta;
        if (DEBUG) {
            serial.writeLine("Accumulations: " + "UD: " + gesture_ud_delta + " LR: " + gesture_lr_delta);
        }
        /* Determine U/D gesture */
        if (gesture_ud_delta >= GESTURE_SENSITIVITY_1) {
            gesture_ud_count = 1;
        } else if (gesture_ud_delta <= -GESTURE_SENSITIVITY_1) {
            gesture_ud_count = -1;
        } else {
            gesture_ud_count = 0;
        }

        /* Determine L/R gesture */
        if (gesture_lr_delta >= GESTURE_SENSITIVITY_1) {
            gesture_lr_count = 1;
        } else if (gesture_lr_delta <= -GESTURE_SENSITIVITY_1) {
            gesture_lr_count = -1;
        } else {
            gesture_lr_count = 0;
        }

        /* Determine Near/Far gesture */
        if ((gesture_ud_count == 0) && (gesture_lr_count == 0)) {
            if ((Math.abs(ud_delta) < GESTURE_SENSITIVITY_2) && (Math.abs(lr_delta) < GESTURE_SENSITIVITY_2)) {

                if ((ud_delta == 0) && (lr_delta == 0)) {
                    gesture_near_count++;
                } else if ((ud_delta != 0) || (lr_delta != 0)) {
                    gesture_far_count++;
                }

                if ((gesture_near_count >= 10) && (gesture_far_count >= 2)) {
                    if ((ud_delta == 0) && (lr_delta == 0)) {
                        gesture_state = STATE.NEAR_STATE;
                    } else if ((ud_delta != 0) && (lr_delta != 0)) {
                        gesture_state = STATE.FAR_STATE;
                    }
                    return true;
                }
            }
        } else {
            if ((Math.abs(ud_delta) < GESTURE_SENSITIVITY_2) && (Math.abs(lr_delta) < GESTURE_SENSITIVITY_2)) {

                if ((ud_delta == 0) && (lr_delta == 0)) {
                    gesture_near_count++;
                }

                if (gesture_near_count >= 10) {
                    gesture_ud_count = 0;
                    gesture_lr_count = 0;
                    gesture_ud_delta = 0;
                    gesture_lr_delta = 0;
                }
            }
        }

        if (DEBUG) {
            serial.writeLine("UD_CT: " + gesture_ud_count + " LR_CT: " + gesture_lr_count + " NEAR_CT: " + gesture_near_count
                + " FAR_CT: " + gesture_far_count);
        }

        return true;
    }

    /**
     * @brief Determines swipe direction or near/far state
     *
     * @return True if near/far event. False otherwise.
     */
    function decodeGesture(): boolean {
        //("gesture_state"+gesture_state);
        // serial.writeLine("gesture_ud_count: "+gesture_ud_count+" ; "+"gesture_lr_count: "+gesture_lr_count);
        /* Return if near or far event is detected */
        if (gesture_state == STATE.NEAR_STATE) {
            gesture_motion = DIR.DIR_NEAR;
            return true;
        } else if (gesture_state == STATE.FAR_STATE) {
            gesture_motion = DIR.DIR_FAR;
            return true;
        }

        /* Determine swipe direction */
        if ((gesture_ud_count == -1) && (gesture_lr_count == 0)) {
            gesture_motion = DIR.DIR_UP;
        } else if ((gesture_ud_count == 1) && (gesture_lr_count == 0)) {
            gesture_motion = DIR.DIR_DOWN;
        } else if ((gesture_ud_count == 0) && (gesture_lr_count == 1)) {
            gesture_motion = DIR.DIR_RIGHT;
        } else if ((gesture_ud_count == 0) && (gesture_lr_count == -1)) {
            gesture_motion = DIR.DIR_LEFT;
        } else if ((gesture_ud_count == -1) && (gesture_lr_count == 1)) {
            if (Math.abs(gesture_ud_delta) > Math.abs(gesture_lr_delta)) {
                gesture_motion = DIR.DIR_UP;
            } else {
                gesture_motion = DIR.DIR_RIGHT;
            }
        } else if ((gesture_ud_count == 1) && (gesture_lr_count == -1)) {
            if (Math.abs(gesture_ud_delta) > Math.abs(gesture_lr_delta)) {
                gesture_motion = DIR.DIR_DOWN;
            } else {
                gesture_motion = DIR.DIR_LEFT;
            }
        } else if ((gesture_ud_count == -1) && (gesture_lr_count == -1)) {
            if (Math.abs(gesture_ud_delta) > Math.abs(gesture_lr_delta)) {
                gesture_motion = DIR.DIR_UP;
            } else {
                gesture_motion = DIR.DIR_LEFT;
            }
        } else if ((gesture_ud_count == 1) && (gesture_lr_count == 1)) {
            if (Math.abs(gesture_ud_delta) > Math.abs(gesture_lr_delta)) {
                gesture_motion = DIR.DIR_DOWN;
            } else {
                gesture_motion = DIR.DIR_RIGHT;
            }
        } else {
            return false;
        }

        return true;
    }

    /**
     * @brief Processes a gesture event and returns best guessed gesture
     *
     * @return Number corresponding to gesture. -1 on error.
     */
    function readGesture(): number {
        let fifo_level: number = 0;
        let bytes_read: number = 0;
        let fifo_data: number[] = [];
        let gstatus: number;
        let motion: number;
        let i: number;
        //resetGestureParameters();
        gesture_data.d_data = pins.createBuffer(32);
        gesture_data.u_data = pins.createBuffer(32);
        gesture_data.l_data = pins.createBuffer(32);
        gesture_data.r_data = pins.createBuffer(32);
        //("read sensor start");
        /* Make sure that power and gesture is on and data is valid */
        if (!isGestureAvailable() || !(getMode() & 0b01000001)) {
            return DIR.DIR_NONE;
        }

        /* Keep looping as long as gesture data is valid */
        while (1) {
            basic.pause(30);
            /* Get the contents of the STATUS register. Is data still valid? */
            gstatus = APDS9960ReadReg(APDS9960_GSTATUS);
            /* If we have valid data, read in FIFO */
            if ((gstatus & APDS9960_GVALID) == APDS9960_GVALID) {
                /* Read the current FIFO level */
                fifo_level = APDS9960ReadReg(APDS9960_GFLVL);

                if (DEBUG) {
                    serial.writeLine("FIFO Level: " + fifo_level);
                }

                /* If there's stuff in the FIFO, read it into our data block */
                if (fifo_level > 0) {
                    bytes_read = APDS9960ReadRegBlock(APDS9960_GFIFO_U,
                        (fifo_level * 4));
                    // bytes_read = APDS9960ReadRegBlock(APDS9960_GFIFO_U,fifo_level );

                    for (let i = 0; i < bytes_read; i++) {
                        fifo_data[i] = data_buf[i];
                    }

                    if (0) {
                        serial.writeLine("FIFO Dump: ");
                        for (i = 0; i < bytes_read; i++) {
                            serial.writeLine("NO. " + i + " : " + fifo_data[i]);
                        }
                        serial.writeLine("FIFO END");
                    }

                    if (bytes_read >= 4) {
                        for (let ii = 0; ii < bytes_read; ii = ii + 4) {
                            gesture_data.u_data[gesture_data.index] = fifo_data[ii + 0];
                            gesture_data.d_data[gesture_data.index] = fifo_data[ii + 1];
                            gesture_data.l_data[gesture_data.index] = fifo_data[ii + 2];
                            gesture_data.r_data[gesture_data.index] = fifo_data[ii + 3];
                            gesture_data.index++;
                            gesture_data.total_gestures++;
                        }

                        if (0) {
                            serial.writeLine("Up Data: ");
                            for (i = 0; i < gesture_data.total_gestures; i++) {
                                serial.writeLine(gesture_data.u_data[i].toString());
                            }
                            serial.writeLine("Up END");
                        }

                        /* Filter and process gesture data. Decode near/far state */
                        if (processGestureData()) {
                            if (decodeGesture()) {
                                motion = gesture_motion;
                                if (DEBUG) {
                                    serial.writeLine("gesture_motion: " + gesture_motion.toString());
                                }
                                resetGestureParameters();
                                return motion;
                            }
                        }
                        /* Reset data */
                        gesture_data.index = 0;
                        gesture_data.total_gestures = 0;
                    }

                }

            }
            else {
                /* Determine best guessed gesture and clean up */
                basic.pause(30);
                decodeGesture();
                motion = gesture_motion;
                if (DEBUG) {
                    serial.writeLine("END: ");
                    serial.writeLine("gesture_motion" + gesture_motion);
                }

                resetGestureParameters();
                return motion;
            }

        }

        motion = gesture_motion;
        return motion;
    }

    /**
     * Create a new driver of Grove - Gesture
     */
    //% blockId=grove_gesture_init
    //% block="%apds9960|Initiate the Gesture sensor APDS9960"
    //% subcategory="gesture apds9960"
    export function init() {
        pads9960_init();
        enableGestureSensor(false);
        //serial.writeLine("Initializing");
        if (0) {
            /* Gesture config register dump */
            let reg: number = 0x00;
            let val: number = 0x00;

            for (reg = 0x80; reg <= 0xAF; reg++) {
                if ((reg != 0x82) &&
                    (reg != 0x8A) &&
                    (reg != 0x91) &&
                    (reg != 0xA8) &&
                    (reg != 0xAC) &&
                    (reg != 0xAD)) {
                    val = APDS9960ReadReg(reg);
                    //serial.writeLine(reg + ": 0x" + val);
                }
            }

            for (reg = 0xE4; reg <= 0xE7; reg++) {
                val = APDS9960ReadReg(reg);
                //serial.writeLine(reg + ": 0x" + val);
            }

        }
    }

    /**
     * Do something when a gesture is detected by Grove - Gesture
     * @param gesture type of gesture to detect
     * @param handler code to run
     */
    //% blockId=grove_gesture_create_event
    //% block="Gesture|%gesture"
    //% subcategory="gesture apds9960"
    //export function onGesture(gesture: BrickcellGesture, handler: Action) {
    export function onGesture(gesture: BrickcellGesture, body: () => void): void {
        //control.onEvent(gestureEventId, gesture, handler);
        //let apds9960 = new APDS9960();
        //init();
        if (gesture == BrickcellGesture.Right) control.onEvent(gestureRightID, gesture, body);
        if (gesture == BrickcellGesture.Left) control.onEvent(gestureLeftID, gesture, body);
        if (gesture == BrickcellGesture.Up) control.onEvent(gestureUpID, gesture, body);
        if (gesture == BrickcellGesture.Down) control.onEvent(gestureDownID, gesture, body);

        control.inBackground(() => {
            while (true) {
                const gesture = readGesture();

                if (gesture != lastGesture) {
                    lastGesture = gesture;
                    switch (gesture) {
                        case 1:
                            control.raiseEvent(gestureRightID, BrickcellGesture.Right);
                            break;
                        case 2:
                            control.raiseEvent(gestureLeftID, BrickcellGesture.Left);
                            break;
                        case 3:
                            control.raiseEvent(gestureUpID, BrickcellGesture.Up);
                            break;
                        case 4:
                            control.raiseEvent(gestureDownID, BrickcellGesture.Down);
                            break;
                    }
                }
                //basic.pause(1800);
                basic.pause(50);
                //serial.writeLine("Start gesture.");
            }
        })
    }


    /////////////////////////////////////////////////////////////////////////
    ////////////////////
    //Actuators //
    ////////////////////


    // Convert any DigitalPinPrime to AnalogPin (for PWM control)
    function getDigitalPin(pin: DigitalPinPrime): DigitalPin {
        switch (pin) {
            case DigitalPinPrime.P0: return DigitalPin.P0;
            case DigitalPinPrime.P1: return DigitalPin.P1;
            case DigitalPinPrime.P2: return DigitalPin.P2;
            case DigitalPinPrime.P3: return DigitalPin.P3;
            case DigitalPinPrime.P4: return DigitalPin.P4;
            case DigitalPinPrime.P9: return DigitalPin.P9;
            case DigitalPinPrime.P10: return DigitalPin.P10;
            case DigitalPinPrime.P13: return DigitalPin.P13;
            case DigitalPinPrime.P14: return DigitalPin.P14;
            case DigitalPinPrime.P15: return DigitalPin.P15;
            case DigitalPinPrime.P19: return DigitalPin.P19;
            case DigitalPinPrime.P20: return DigitalPin.P20;
            default: return DigitalPin.P0; // Fallback
        }
    }

    // Define servo positions enumeration
    export enum ServoPosition {
        //% block="0 degrees"
        Zero = 0,
        //% block="45 degrees"
        FortyFive = 45,
        //% block="90 degrees"
        Ninety = 90,
        //% block="135 degrees"
        OneThirtyFive = 135,
        //% block="180 degrees"
        OneEighty = 180
    }


    /**
    * Moves a servo to a specified position.
    * @param pin which pin to control
    * @param position the position to move to
    */
    //% subcategory="Actuators"
    //% weight=150 blockGap=8
    //% group="Positional Servo"
    //% blockId="move_positional_servo"
    //% block="move servo on pin %pin|to position %position"
    //% position.min=0 position.max=180
    export function movePositionalServo(pin: DigitalPinPrime, position: number): void {
        const angle = Math.clamp(0, 180, position);  // Ensure angle is within 0-180 range
        pins.servoWritePin(getDigitalPin(pin), angle);
    }

    /**
     * Moves a servo to a specified position.
     * @param pin which pin to control
     * @param position the position to move to
     */
    //% subcategory="Actuators"
    //% weight=120 blockGap=8
    //% group="Positional Servo"
    //% blockId="move_positional_servo_to_fixed_point"
    //% block="move servo on pin %pin|to position %position"
    export function movePositionalServofixed(pin: DigitalPinPrime, position: ServoPosition): void {
        // Using the ServoPosition enum, which already contains the angle values
        pins.servoWritePin(getDigitalPin(pin), position);  // position is directly the angle in degrees
    }

    //% subcategory="Actuators"
    //% weight=10 blockGap=8
    //% group="Positional Servo" 
    //% blockId="move_servo_from_to"
    //% block="move servo on pin %pin|from angle %from|to angle %to|over %duration seconds"
    //% from.min=0 from.max=180
    //% to.min=0 to.max=180
    //% duration.min=1 duration.max=10
    export function moveServoFromTo1(pin: DigitalPinPrime, from: number, to: number, duration: number): void {
        const startAngle = Math.clamp(0, 180, from);
        const endAngle = Math.clamp(0, 180, to);
        const steps = Math.abs(endAngle - startAngle);
        const stepDuration = duration * 1000 / steps;

        // Loop through each step and move the servo
        for (let i = 0; i <= steps; i++) {
            // Calculate the current angle for the servo based on the direction of movement
            const currentAngle = startAngle + (endAngle > startAngle ? i : -i);

            // Ensure that we don't exceed the target angle, especially when rounding
            if ((endAngle > startAngle && currentAngle >= endAngle) || (endAngle < startAngle && currentAngle <= endAngle)) {
                // Set the final angle to the target and break the loop
                pins.servoWritePin(getDigitalPin(pin), endAngle);
                break; // exit the loop once we reach the target angle
            } else {
                // Otherwise, move the servo to the current calculated angle
                pins.servoWritePin(getDigitalPin(pin), currentAngle);
            }

            // Pause for the time before moving to the next step
            basic.pause(stepDuration);
        }
    }

    /**
     * Controls the speed and direction of a continuous rotation servo.
     * @param pin which pin to control
     * @param speed the speed of the servo motor (-100 to 100)
     */
    //% subcategory="Actuators"
    //% weight=40 blockGap=8
    //% group="Continuous Servo"
    //% blockId="move_continuous_servo"
    //% block="set continuous servo on pin %pin|to speed %speed"
    //% speed.min=-100 speed.max=100
    export function moveContinuousServo(pin: DigitalPinPrime, speed: number): void {
        const speedValue = Math.clamp(-100, 100, speed);  // Ensure speed is within -100 to 100 range

        // Map speed to the correct PWM values (using -100 for full reverse and 100 for full forward)
        const pwmValue = Math.map(speedValue, -100, 100, 0, 180);  // 40-120 range typically works for continuous servos

        // Write the PWM value to the pin
        pins.servoWritePin(getDigitalPin(pin), pwmValue);
    }


    /**
     * Stops the continuous rotation servo.
     * @param pin which pin to control
     */
    //% subcategory="Actuators"
    //% weight=30 blockGap=8
    //% group="Continuous Servo"
    //% blockId="stop_continuous_servo"
    //% block="stop continuous servo on pin %pin"
    export function stopContinuousServo(pin: DigitalPinPrime): void {
        // Set speed to 0 to stop the motor
        pins.servoWritePin(getDigitalPin(pin), 90);  // 90 typically stops a continuous servo
    }


    /////////////////////////////////////////////////////////////////////////


    declare interface Math {
        floor(x: number): number;
    }
    let font: Buffer;
    const SSD1306_SETCONTRAST = 0x81
    const SSD1306_SETCOLUMNADRESS = 0x21
    const SSD1306_SETPAGEADRESS = 0x22
    const SSD1306_DISPLAYALLON_RESUME = 0xA4
    const SSD1306_DISPLAYALLON = 0xA5
    const SSD1306_NORMALDISPLAY = 0xA6
    const SSD1306_INVERTDISPLAY = 0xA7
    const SSD1306_DISPLAYOFF = 0xAE
    const SSD1306_DISPLAYON = 0xAF
    const SSD1306_SETDISPLAYOFFSET = 0xD3
    const SSD1306_SETCOMPINS = 0xDA
    const SSD1306_SETVCOMDETECT = 0xDB
    const SSD1306_SETDISPLAYCLOCKDIV = 0xD5
    const SSD1306_SETPRECHARGE = 0xD9
    const SSD1306_SETMULTIPLEX = 0xA8
    const SSD1306_SETLOWCOLUMN = 0x00
    const SSD1306_SETHIGHCOLUMN = 0x10
    const SSD1306_SETSTARTLINE = 0x40
    const SSD1306_MEMORYMODE = 0x20
    const SSD1306_COMSCANINC = 0xC0
    const SSD1306_COMSCANDEC = 0xC8
    const SSD1306_SEGREMAP = 0xA0
    const SSD1306_CHARGEPUMP = 0x8D
    const chipAdress = 0x3C
    const xOffset = 0
    const yOffset = 0
    let charX = 0
    let charY = 0
    let displayWidth = 128
    let displayHeight = 64 / 8
    let screenSize = 0

    //let font: Array<Array<number>>
    let loadStarted: boolean;
    let loadPercent: number;
    function command(cmd: number) {
        let buf = pins.createBuffer(2)
        buf[0] = 0x00
        buf[1] = cmd
        pins.i2cWriteBuffer(chipAdress, buf, false)
    }


    //% subcategory="Actuators"
    //% group="OLED"
    //% block="initialize OLED with width $width height $height"
    //% width.defl=128
    //% height.defl=64
    //% weight=150
    export function initOLED(width: number, height: number) {
        command(SSD1306_DISPLAYOFF);
        command(SSD1306_SETDISPLAYCLOCKDIV);
        command(0x80);                                  // the suggested ratio 0x80
        command(SSD1306_SETMULTIPLEX);
        command(0x3F);
        command(SSD1306_SETDISPLAYOFFSET);
        command(0x0);                                   // no offset
        command(SSD1306_SETSTARTLINE | 0x0);            // line #0
        command(SSD1306_CHARGEPUMP);
        command(0x14);
        command(SSD1306_MEMORYMODE);
        command(0x00);                                  // 0x0 act like ks0108
        command(SSD1306_SEGREMAP | 0x1);
        command(SSD1306_COMSCANDEC);
        command(SSD1306_SETCOMPINS);
        command(0x12);
        command(SSD1306_SETCONTRAST);
        command(0xCF);
        command(SSD1306_SETPRECHARGE);
        command(0xF1);
        command(SSD1306_SETVCOMDETECT);
        command(0x40);
        command(SSD1306_DISPLAYALLON_RESUME);
        command(SSD1306_NORMALDISPLAY);
        command(SSD1306_DISPLAYON);
        displayWidth = width
        displayHeight = height / 8
        screenSize = displayWidth * displayHeight
        charX = xOffset
        charY = yOffset
        font = hex`
    0000000000
    3E5B4F5B3E
    3E6B4F6B3E
    1C3E7C3E1C
    183C7E3C18
    1C577D571C
    1C5E7F5E1C
    00183C1800
    FFE7C3E7FF
    0018241800
    FFE7DBE7FF
    30483A060E
    2629792926
    407F050507
    407F05253F
    5A3CE73C5A
    7F3E1C1C08
    081C1C3E7F
    14227F2214
    5F5F005F5F
    06097F017F
    006689956A
    6060606060
    94A2FFA294
    08047E0408
    10207E2010
    08082A1C08
    081C2A0808
    1E10101010
    0C1E0C1E0C
    30383E3830
    060E3E0E06
    0000000000
    00005F0000
    0007000700
    147F147F14
    242A7F2A12
    2313086462
    3649562050
    0008070300
    001C224100
    0041221C00
    2A1C7F1C2A
    08083E0808
    0080703000
    0808080808
    0000606000
    2010080402
    3E5149453E
    00427F4000
    7249494946
    2141494D33
    1814127F10
    2745454539
    3C4A494931
    4121110907
    3649494936
    464949291E
    0000140000
    0040340000
    0008142241
    1414141414
    0041221408
    0201590906
    3E415D594E
    7C1211127C
    7F49494936
    3E41414122
    7F4141413E
    7F49494941
    7F09090901
    3E41415173
    7F0808087F
    00417F4100
    2040413F01
    7F08142241
    7F40404040
    7F021C027F
    7F0408107F
    3E4141413E
    7F09090906
    3E4151215E
    7F09192946
    2649494932
    03017F0103
    3F4040403F
    1F2040201F
    3F4038403F
    6314081463
    0304780403
    6159494D43
    007F414141
    0204081020
    004141417F
    0402010204
    4040404040
    0003070800
    2054547840
    7F28444438
    3844444428
    384444287F
    3854545418
    00087E0902
    18A4A49C78
    7F08040478
    00447D4000
    2040403D00
    7F10284400
    00417F4000
    7C04780478
    7C08040478
    3844444438
    FC18242418
    18242418FC
    7C08040408
    4854545424
    04043F4424
    3C4040207C
    1C2040201C
    3C4030403C
    4428102844
    4C9090907C
    4464544C44
    0008364100
    0000770000
    0041360800
    0201020402
    3C2623263C
    1EA1A16112
    3A4040207A
    3854545559
    2155557941
    2154547841
    2155547840
    2054557940
    0C1E527212
    3955555559
    3954545459
    3955545458
    0000457C41
    0002457D42
    0001457C40
    F0292429F0
    F0282528F0
    7C54554500
    2054547C54
    7C0A097F49
    3249494932
    3248484832
    324A484830
    3A4141217A
    3A42402078
    009DA0A07D
    3944444439
    3D4040403D
    3C24FF2424
    487E494366
    2B2FFC2F2B
    FF0929F620
    C0887E0903
    2054547941
    0000447D41
    3048484A32
    384040227A
    007A0A0A72
    7D0D19317D
    2629292F28
    2629292926
    30484D4020
    3808080808
    0808080838
    2F10C8ACBA
    2F102834FA
    00007B0000
    08142A1422
    22142A1408
    AA005500AA
    AA55AA55AA
    000000FF00
    101010FF00
    141414FF00
    1010FF00FF
    1010F010F0
    141414FC00
    1414F700FF
    0000FF00FF
    1414F404FC
    141417101F
    10101F101F
    1414141F00
    101010F000
    0000001F10
    1010101F10
    101010F010
    000000FF10
    1010101010
    101010FF10
    000000FF14
    0000FF00FF
    00001F1017
    0000FC04F4
    1414171017
    1414F404F4
    0000FF00F7
    1414141414
    1414F700F7
    1414141714
    10101F101F
    141414F414
    1010F010F0
    00001F101F
    0000001F14
    000000FC14
    0000F010F0
    1010FF10FF
    141414FF14
    1010101F00
    000000F010
    FFFFFFFFFF
    F0F0F0F0F0
    FFFFFF0000
    000000FFFF
    0F0F0F0F0F
    3844443844
    7C2A2A3E14
    7E02020606
    027E027E02
    6355494163
    3844443C04
    407E201E20
    06027E0202
    99A5E7A599
    1C2A492A1C
    4C7201724C
    304A4D4D30
    3048784830
    BC625A463D
    3E49494900
    7E0101017E
    2A2A2A2A2A
    44445F4444
    40514A4440
    40444A5140
    0000FF0103
    E080FF0000
    08086B6B08
    3612362436
    060F090F06
    0000181800
    0000101000
    3040FF0101
    001F01011E
    00191D1712
    003C3C3C3C
    0000000000`
        loadStarted = false
        loadPercent = 0
        clear()
    }


    // Clear the OLED screen
    /**
     * Clears everything displayed on the OLED screen, leaving it blank and ready for new content.
     */
    //% subcategory="Actuators"
    //% blockId="one_bit_prime_clear_screen"
    //% group="OLED"
    //% block="clear OLED display"
    //% weight=130 blockGap=8
    export function clear() {
        loadStarted = false
        loadPercent = 0
        command(SSD1306_SETCOLUMNADRESS)
        command(0x00)
        command(displayWidth - 1)
        command(SSD1306_SETPAGEADRESS)
        command(0x00)
        command(displayHeight - 1)
        let data = pins.createBuffer(17);
        data[0] = 0x40; // Data Mode
        for (let i = 1; i < 17; i++) {
            data[i] = 0x00
        }
        // send display buffer in 16 byte chunks
        for (let i = 0; i < screenSize; i += 16) {
            pins.i2cWriteBuffer(chipAdress, data, false)
        }
        charX = xOffset
        charY = yOffset
    }


    // Show string at x and y coordinates
    /**
     * Displays a string at the specified x and y coordinates on the OLED display.
     * If the string exceeds the width of the screen, it will continue on the next line.
     */
    //% subcategory="Actuators"
    //% blockId="one_bit_prime_write_string"
    //% group="OLED"
    //% block="show string at x: $x y: $y with text $str"
    //% x.defl=0
    //% y.defl=0
    //% weight=120 blockGap=8
    export function writeStringAt(x: number, y: number, str: string) {
        let originalX = charX;
        let originalY = charY;
        charX = x;
        charY = y;

        for (let i = 0; i < str.length; i++) {
            if (charX > displayWidth - 6) {
                newLine();
            }
            drawChar(charX, charY, str.charAt(i));
            charX += 6;
        }

        // Reset the cursor back to the original position
        charX = originalX;
        charY = originalY;
    }

    // Show number at x and y coordinates
    /**
     * Displays a number at the specified x and y coordinates on the OLED display.
     * The number is converted to a string before being displayed.
     */
    //% subcategory="Actuators"
    //% blockId="one_bit_prime_write_number"
    //% group="OLED"
    //% block="show number $n at x: $x y: $y"
    //% weight=110 blockGap=8
    export function writeNumAt(x: number, y: number, n: number) {
        let numString = n.toString();  // Convert the number to a string
        let charX = x;  // Starting X coordinate
        let charY = y;  // Starting Y coordinate

        // Loop through each character of the number string and display it at the coordinates
        for (let i = 0; i < numString.length; i++) {
            if (charX > displayWidth - 6) {
                newLine();
            }
            drawChar(charX, charY, numString.charAt(i));
            charX += 6;  // Move to the next character position
        }
    }

    function newLine() {
        charY++
        charX = xOffset
    }
    function drawChar(x: number, y: number, c: string) {
        command(SSD1306_SETCOLUMNADRESS)
        command(x)
        command(x + 5)
        command(SSD1306_SETPAGEADRESS)
        command(y)
        command(y + 1)
        let line = pins.createBuffer(2)
        line[0] = 0x40
        for (let i = 0; i < 6; i++) {
            if (i === 5) {
                line[1] = 0x00
            } else {
                let charIndex = c.charCodeAt(0)
                let charNumber = font.getNumber(NumberFormat.UInt8BE, 5 * charIndex + i)
                line[1] = charNumber

            }
            pins.i2cWriteBuffer(chipAdress, line, false)
        }

    }
    function drawShape(pixels: Array<Array<number>>) {
        let x1 = displayWidth
        let y1 = displayHeight * 8
        let x2 = 0
        let y2 = 0
        for (let i = 0; i < pixels.length; i++) {
            if (pixels[i][0] < x1) {
                x1 = pixels[i][0]
            }
            if (pixels[i][0] > x2) {
                x2 = pixels[i][0]
            }
            if (pixels[i][1] < y1) {
                y1 = pixels[i][1]
            }
            if (pixels[i][1] > y2) {
                y2 = pixels[i][1]
            }
        }
        let page1 = Math.floor(y1 / 8)
        let page2 = Math.floor(y2 / 8)
        let line = pins.createBuffer(2)
        line[0] = 0x40
        for (let x = x1; x <= x2; x++) {
            for (let page = page1; page <= page2; page++) {
                line[1] = 0x00
                for (let i = 0; i < pixels.length; i++) {
                    if (pixels[i][0] === x) {
                        if (Math.floor(pixels[i][1] / 8) === page) {
                            line[1] |= Math.pow(2, (pixels[i][1] % 8))
                        }
                    }
                }
                if (line[1] !== 0x00) {
                    command(SSD1306_SETCOLUMNADRESS)
                    command(x)
                    command(x + 1)
                    command(SSD1306_SETPAGEADRESS)
                    command(page)
                    command(page + 1)
                    //line[1] |= pins.i2cReadBuffer(chipAdress, 2)[1]
                    pins.i2cWriteBuffer(chipAdress, line, false)
                }
            }
        }
    }


    // Draw a line from (x0, y0) to (x1, y1)
    /**
     * Draws a line between the two specified points on the OLED screen.
     * The line is drawn using Bresenham's line algorithm.
     */
    //% subcategory="Actuators"
    //% blockId="one_bit_prime_draw_line"
    //% group="OLED"
    //% block="draw line from:|x: $x0 y: $y0 to| x: $x1 y: $y1"
    //% x0.defl=0
    //% y0.defl=0
    //% x1.defl=20
    //% y1.defl=20
    //% weight=100 blockGap=8
    export function drawLine(x0: number, y0: number, x1: number, y1: number) {
        let pixels: Array<Array<number>> = []
        let kx: number, ky: number, c: number, i: number, xx: number, yy: number, dx: number, dy: number;
        let targetX = x1
        let targetY = y1
        x1 -= x0; kx = 0; if (x1 > 0) kx = +1; if (x1 < 0) { kx = -1; x1 = -x1; } x1++;
        y1 -= y0; ky = 0; if (y1 > 0) ky = +1; if (y1 < 0) { ky = -1; y1 = -y1; } y1++;
        if (x1 >= y1) {
            c = x1
            for (i = 0; i < x1; i++, x0 += kx) {
                pixels.push([x0, y0])
                c -= y1; if (c <= 0) { if (i != x1 - 1) pixels.push([x0 + kx, y0]); c += x1; y0 += ky; if (i != x1 - 1) pixels.push([x0, y0]); }
                if (pixels.length > 20) {
                    drawShape(pixels)
                    pixels = []
                    drawLine(x0, y0, targetX, targetY)
                    return
                }
            }
        } else {
            c = y1
            for (i = 0; i < y1; i++, y0 += ky) {
                pixels.push([x0, y0])
                c -= x1; if (c <= 0) { if (i != y1 - 1) pixels.push([x0, y0 + ky]); c += y1; x0 += kx; if (i != y1 - 1) pixels.push([x0, y0]); }
                if (pixels.length > 20) {
                    drawShape(pixels)
                    pixels = []
                    drawLine(x0, y0, targetX, targetY)
                    return
                }
            }
        }
        drawShape(pixels)
    }

    /**
     * Draws a rectangle on the OLED display from the starting point (x0, y0) to the end point (x1, y1).
     * The rectangle is drawn by drawing four lines: top, bottom, left, and right.
     */
    //% subcategory="Actuators"
    //% blockId="one_bit_prime_draw_rectangle"
    //% group="OLED"
    //% block="draw rectangle from:|x: $x0 y: $y0 to| x: $x1 y: $y1"
    //% x0.defl=0
    //% y0.defl=0
    //% x1.defl=20
    //% y1.defl=20
    //% weight=90 blockGap=8
    export function drawRectangle(x0: number, y0: number, x1: number, y1: number) {
        drawLine(x0, y0, x1, y0)
        drawLine(x0, y1, x1, y1)
        drawLine(x0, y0, x0, y1)
        drawLine(x1, y0, x1, y1)
    }


    // Draw a circle at (x, y) with radius r
    /**
     * Draws a circle at the specified coordinates (x, y) with the given radius.
     * The circle is drawn by plotting points along the circumference.
     */
    //% subcategory="Actuators"
    //% blockId="one_bit_prime_draw_circle"
    //% group="OLED"
    //% block="draw circle at x: $x y: $y radius: $r"
    //% x.defl=64
    //% y.defl=32
    //% r.defl=10
    //% weight=80 blockGap=8
    export function drawCircle(x: number, y: number, r: number) {
        let theta = 0;
        let step = Math.PI / 90;  // Adjust step for smoothness
        let pixels: Array<Array<number>> = [];

        while (theta < 2 * Math.PI) {
            let xPos = Math.floor(x + r * Math.cos(theta));
            let yPos = Math.floor(y + r * Math.sin(theta));
            pixels.push([xPos, yPos]);
            theta += step;
        }

        drawShape(pixels);
    }


    ///////////////////////////////////////////////////////////////////////////


    ////////////////////
    //  Rainbow BLOCKS  //
    ////////////////////

    let rainbowBuffer: Buffer = null; // LED data buffer
    let rainbowNumLeds: number = 24;  // Number of LEDs
    let rainbowBrightness: number = 255; // Default brightness


    /**
     * Initialize the Rainbow strip
     * @param numLeds number of LEDs in the strip
     */

    //% blockId="rainbow_initialize"
    //% subcategory="Rainbow"
    //% block="initialize Rainbow with %numLeds|LEDs"
    //% weight=145 blockGap=8
    export function initializeRainbow(numLeds: number): void {
        rainbowNumLeds = numLeds;
        rainbowBuffer = control.createBuffer(numLeds * 3);
        clearRainbow(); // Ensure all LEDs start off
    }



    /**
     * Show data on the Rainbow LEDs connected to P2
    */
    function showRainbowBuffer(): void {
        if (rainbowBuffer) {
            light.sendWS2812Buffer(rainbowBuffer, DigitalPin.P2); // Using P2 for Rainbow connection
        }
    }


    /**
     * Show rainbow colors on the strip
     */
    //% subcategory="Rainbow"
    //% blockId="rainbow_show_rainbow"
    //% block="show Rainbow"
    //% weight=140 blockGap=8
    export function showRainbow(): void {
        if (rainbowBuffer) {
            for (let i = 0; i < rainbowNumLeds; i++) {
                let angle = (i / rainbowNumLeds) * 2 * Math.PI;
                let red = Math.max(0, Math.sin(angle + (1 / 3) * Math.PI) * 127 + 128);
                let green = Math.max(0, Math.sin(angle + (2 / 3) * Math.PI) * 127 + 128);
                let blue = Math.max(0, Math.sin(angle + (4 / 3) * Math.PI) * 127 + 128);
                setRainbowLedColorRaw(i, Math.floor(red), Math.floor(green), Math.floor(blue));
            }
            showRainbowBuffer();
        }
    }

    /**
     * Clear all LEDs on the strip
     */
    //% subcategory="Rainbow"
    //% blockId="rainbow_clear"
    //% block="clear Rainbow"
    //% weight=130 blockGap=8
    export function clearRainbow(): void {
        if (rainbowBuffer) {
            rainbowBuffer.fill(0);
            showRainbowBuffer();
        }
    }

    /**
     * Set color of all LEDs on the strip
     * @param color the color to set
     */
    //% subcategory="Rainbow"
    //% value.defl='#ff0000'
    //% blockId="rainbow_set_color"
    //% block="set Rainbow color to %color"
    //% weight=120 blockGap=8
    //% color.shadow="brightColorNumberPicker"
    export function setRainbowColor(color: number): void {
        let red = (color >> 16) & 0xFF;
        let green = (color >> 8) & 0xFF;
        let blue = color & 0xFF;
        for (let i = 0; i < rainbowNumLeds; i++) {
            setRainbowLedColorRaw(i, red, green, blue);
        }
        showRainbowBuffer();
    }

    /**
     * Set color of a specific LED on the strip
     * @param ledIndex the index of the LED to change
     * @param color the color to set
     */
    //% subcategory="Rainbow"
    //% value.defl='#ff0000'
    //% blockId="rainbow_set_led_color"
    //% block="set Rainbow LED %ledIndex|color to %color"
    //% weight=110 blockGap=8
    //% color.shadow="brightColorNumberPicker"
    export function setRainbowLedColor(ledIndex: number, color: number): void {
        if (rainbowBuffer && ledIndex < rainbowNumLeds) {
            let red = (color >> 16) & 0xFF;
            let green = (color >> 8) & 0xFF;
            let blue = color & 0xFF;

            let index = ledIndex * 3; // Calculate position in buffer
            rainbowBuffer.setUint8(index, (red * rainbowBrightness) >> 8); // Scale brightness
            rainbowBuffer.setUint8(index + 1, (green * rainbowBrightness) >> 8); // Scale brightness
            rainbowBuffer.setUint8(index + 2, (blue * rainbowBrightness) >> 8); // Scale brightness

            showRainbowBuffer(); // Send updated buffer to the LEDs
        }
    }

    /**
     * Set brightness of the strip
     * @param brightness brightness level (0-255)
     */
    //% subcategory="Rainbow"
    //% blockId="rainbow_set_brightness"
    //% block="set Rainbow brightness to %brightness"
    //% weight=100 blockGap=8
    export function setRainbowBrightness(brightness: number): void {
        rainbowBrightness = Math.clamp(0, 255, brightness);
        applyRainbowBrightness(); // Apply brightness scaling to the buffer
        showRainbowBuffer(); // Update LEDs with adjusted brightness
    }

    /**
     * Apply brightness scaling to the buffer
     */
    function applyRainbowBrightness(): void {
        if (!rainbowBuffer) return;

        for (let i = 0; i < rainbowNumLeds; i++) {
            let index = i * 3;
            rainbowBuffer[index] = (rainbowBuffer[index] * rainbowBrightness) >> 8; // Scale Green
            rainbowBuffer[index + 1] = (rainbowBuffer[index + 1] * rainbowBrightness) >> 8; // Scale Red
            rainbowBuffer[index + 2] = (rainbowBuffer[index + 2] * rainbowBrightness) >> 8; // Scale Blue
        }
    }

    /**
     * Set color of a specific LED using raw RGB values
     * @param ledIndex the index of the LED to change
     * @param red Red value (0-255)
     * @param green Green value (0-255)
     * @param blue Blue value (0-255)
     */
    function setRainbowLedColorRaw(index: number, red: number, green: number, blue: number): void {
        if (!rainbowBuffer || index >= rainbowNumLeds) return;

        let brightnessScale = rainbowBrightness / 255; // Scale factor for brightness
        rainbowBuffer[index * 3 + 0] = Math.floor(green * brightnessScale); // GRB: Green
        rainbowBuffer[index * 3 + 1] = Math.floor(red * brightnessScale);   // GRB: Red
        rainbowBuffer[index * 3 + 2] = Math.floor(blue * brightnessScale);  // GRB: Blue
    }

    /**
     * Show a gradient pattern on the strip
     * @param startHue the starting hue value (0-360)
     * @param length the length of the gradient in number of LEDs
     * @param fromColor starting color of the gradient
     * @param toColor ending color of the gradient
     */
    //% subcategory="Rainbow"
    //% value.defl='#ff0000' 
    //% blockId="rainbow_gradient"
    //% block="show gradient with start hue %startHue|length %length|from %fromColor|to %toColor"
    //% weight=90 blockGap=8
    //% fromColor.shadow="brightColorNumberPicker" 
    //% toColor.shadow="brightColorNumberPicker"
    export function showRainbowGradient(startHue: number, length: number, fromColor: number, toColor: number): void {
        for (let i = 0; i < length; i++) {
            let blendColor = blendColors(fromColor, toColor, i / length);
            setRainbowLedColor(i, blendColor); // Custom function to set LED color
        }
        showRainbowBuffer(); // Custom function to apply changes
    }

    /**
     * Helper function to blend two colors
     * @param color1 the first color
     * @param color2 the second color
     * @param blend the blend factor between the two colors (0-1)
     */
    function blendColors(color1: number, color2: number, blend: number): number {
        let r1 = (color1 >> 16) & 0xFF;
        let g1 = (color1 >> 8) & 0xFF;
        let b1 = color1 & 0xFF;

        let r2 = (color2 >> 16) & 0xFF;
        let g2 = (color2 >> 8) & 0xFF;
        let b2 = color2 & 0xFF;

        let r = Math.round(r1 * (1 - blend) + r2 * blend);
        let g = Math.round(g1 * (1 - blend) + g2 * blend);
        let b = Math.round(b1 * (1 - blend) + b2 * blend);

        return (r << 16) | (g << 8) | b;
    }


    /**
     * Custom color picker with all specified colors
     */
    //% subcategory="Rainbow"
    //% value.defl='#CCFF00'
    //% weight=80 blockGap=15
    //% blockId=brightColorNumberPicker block="%value"
    //% shim=TD_ID colorSecondary="#FFFFFF"
    //% value.fieldEditor="colornumber" value.fieldOptions.decompileLiterals=true
    //% value.fieldOptions.colours='["#CCFF00","#CCCC00","#CC9900","#CC6600","#CC3300","#CC0000","#660000","#663300","#666600","#669900","#66CC00","#66FF00","#00FF00","#00CC00","#009900","#006600","#003300","#000000","#CCFF33","#CCCC33","#CC9933","#CC6633","#CC3333","#CC0033","#660033","#663333","#666633","#669933","#66CC33","#66FF33","#00FF33","#00CC33","#009933","#006633","#003333","#000033","#CCFF66","#CCCC66","#CC9966","#CC6666","#CC3366","#CC0066","#660066","#663366","#666666","#669966","#66CC66","#66FF66","#00FF66","#00CC66","#009966","#006666","#003366","#000066","#CCFF99","#CCCC99","#CC9999","#CC6699","#CC3399","#CC0099","#660099","#663399","#666699","#669999","#66CC99","#66FF99","#00FF99","#00CC99","#009999","#006699","#003399","#000099","#CCFFCC","#CCCCCC","#CC99CC","#CC66CC","#CC33CC","#CC00CC","#6600CC","#6633CC","#6666CC","#6699CC","#66CCCC","#66FFCC","#00FFCC","#00CCCC","#0099CC","#0066CC","#0033CC","#0000CC","#CCFFFF","#CCCCFF","#CC99FF","#CC66FF","#CC33FF","#CC00FF","#6600FF","#6633FF","#6666FF","#6699FF","#66CCFF","#66FFFF","#00FFFF","#00CCFF","#0099FF","#0066FF","#0033FF","#0000FF","#FFFFFF","#FFCCFF","#FF99FF","#FF66FF","#FF33FF","#FF00FF","#9900FF","#9933FF","#9966FF","#9999FF","#99CCFF","#99FFFF","#33FFFF","#33CCFF","#3399FF","#3366FF","#3333FF","#3300FF","#FFFFCC","#FFCCCC","#FF99CC","#FF66CC","#FF33CC","#FF00CC","#9900CC","#9933CC","#9966CC","#9999CC","#99CCCC","#99FFCC","#33FFCC","#33CCCC","#3399CC","#3366CC","#3333CC","#3300CC","#FFFF99","#FFCC99","#FF9999","#FF6699","#FF3399","#FF0099","#990099","#993399","#996699","#999999","#99CC99","#99FF99","#33FF99","#33CC99","#339999","#336699","#333399","#330099","#FFFF66","#FFCC66","#FF9966","#FF6666","#FF3366","#FF0066","#990066","#993366","#996666","#999966","#99CC66","#99FF66","#33FF66","#33CC66","#339966","#336666","#333366","#330066","#FFFF33","#FFCC33","#FF9933","#FF6633","#FF3333","#FF0033","#990033","#993333","#996633","#999933","#99CC33","#99FF33","#33FF33","#33CC33","#339933","#336633","#333333","#330033"]'
    //% value.fieldOptions.columns=18 value.fieldOptions.className='rgbColorPicker'
    export function rainbowColorPicker(value: number): number {
        return value;
    }

    /**
     * Get a random color
     */
    //% blockId="rainbow_random_color"
    //% value.defl='#ff0000' 
    //% weight=70 blockGap=15
    //% block="random color"
    //% subcategory="Rainbow"
    export function rainbowRandomColor(): number {
        return Math.randomRange(0, 0xFFFFFF);
    }

    /**
     * Convert RGB values to a color number
     * @param r Red value (0-255)
     * @param g Green value (0-255)
     * @param b Blue value (0-255)
     */
    //% blockId="rainbow_rgb_to_color"
    //% value.defl='#ff0000' 
    //% weight=60 blockGap=15
    //% block="R %r|G %g|B %b"
    //% r.min=0 r.max=255
    //% g.min=0 g.max=255
    //% b.min=0 b.max=255
    //% subcategory="Rainbow"
    export function rainbowRgbToColor(r: number, g: number, b: number): number {
        return (r << 16) | (g << 8) | b;
    }

    /**
     * Convert HSL values to a color number
     * @param h Hue (0-360)
     * @param s Saturation (0-100)
     * @param l Luminosity (0-100)
     */
    //% blockId="rainbow_hsl_to_color"
    //% value.defl='#ff0000' 
    //% weight=50 blockGap=15
    //% subcategory="Rainbow"
    //% block="hue %h|saturation %s|luminosity %l"
    //% h.min=0 h.max=360
    //% s.min=0 s.max=100
    //% l.min=0 l.max=100
    export function rainbowHslToColor(h: number, s: number, l: number): number {
        return rainbowHslToRgb(h, s, l); // Custom function for HSL to RGB
    }

    /**
     * Convert HSL values to RGB
     * @param h Hue (0-360)
     * @param s Saturation (0-100)
     * @param l Luminosity (0-100)
     * @returns A packed RGB number (24-bit)
     */
    function rainbowHslToRgb(h: number, s: number, l: number): number {
        h = h % 360; // Ensure hue wraps around 360
        s = s / 100; // Convert saturation to a decimal
        l = l / 100; // Convert luminosity to a decimal

        const c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
        const x = c * (1 - Math.abs((h / 60) % 2 - 1)); // Second largest component
        const m = l - c / 2;

        let r = 0, g = 0, b = 0;

        if (h >= 0 && h < 60) {
            r = c; g = x; b = 0;
        } else if (h >= 60 && h < 120) {
            r = x; g = c; b = 0;
        } else if (h >= 120 && h < 180) {
            r = 0; g = c; b = x;
        } else if (h >= 180 && h < 240) {
            r = 0; g = x; b = c;
        } else if (h >= 240 && h < 300) {
            r = x; g = 0; b = c;
        } else if (h >= 300 && h < 360) {
            r = c; g = 0; b = x;
        }

        // Convert RGB components to 8-bit values and pack into a single integer
        const red = Math.round((r + m) * 255);
        const green = Math.round((g + m) * 255);
        const blue = Math.round((b + m) * 255);

        return (red << 16) | (green << 8) | blue;
    }

    /**
     * Custom function to set a specific LED's color on the rainbow LED strip
     * @param index LED index
     * @param color RGB color
     */
    function rainbowSetLedColor(index: number, color: number): void {
        // Send the appropriate signal to the LEDs
        let r = (color >> 16) & 0xFF;
        let g = (color >> 8) & 0xFF;
        let b = color & 0xFF;

        // Logic to send r, g, and b to the specific LED
        rainbowSendSignalToLed(index, r, g, b);
    }

    /**
     * Function to send RGB signal to a specific LED in the rainbow strip
     */
    function rainbowSendSignalToLed(index: number, r: number, g: number, b: number): void {
        // Use custom bit-banging logic or timing logic here
    }

    /**
     * Function to apply updates to the rainbow LEDs
     */
    function rainbowUpdateLeds(): void {
        // Trigger any necessary latch or update commands for the LEDs
    }

    /**
     * Breathing effect on the Rainbow strip.
     * The LED brightness will gradually increase and decrease, creating a "breathing" effect.
     * @param duration The total duration for the breathing cycle in seconds.
     * @param color The color for the breathing effect.
     */
    //% subcategory="Rainbow"
    //% blockId="rainbow_breathing_effect"
    //% block="start breathing effect for %duration|seconds with color %color"
    //% group=Effects weight=85 blockGap=8
    //% color.shadow="brightColorNumberPicker"
    //% duration.defl=5
    export function rainbowBreathingEffect(duration: number, color: number): void {
        let cycleTime = (duration * 1000) / 2; // Convert seconds to milliseconds and split into fade-in and fade-out
        let steps = 255; // Number of steps for fading (brightness from 0 to 255)
        let stepTime = cycleTime / steps; // Time per step in milliseconds

        // Gradually increase brightness (fade-in)
        for (let brightness = 0; brightness <= 255; brightness++) {
            setRainbowBrightness(brightness); // Set brightness
            applyRainbowColor(color);        // Apply the selected color
            basic.pause(stepTime);
        }

        // Gradually decrease brightness (fade-out)
        for (let brightness = 255; brightness >= 0; brightness--) {
            setRainbowBrightness(brightness); // Set brightness
            applyRainbowColor(color);        // Apply the selected color
            basic.pause(stepTime);
        }
    }

    /**
     * Apply the selected color to the Rainbow LED strip
     * @param color The color to set
     */
    function applyRainbowColor(color: number): void {
        let red = (color >> 16) & 0xFF;
        let green = (color >> 8) & 0xFF;
        let blue = color & 0xFF;
        for (let i = 0; i < rainbowNumLeds; i++) {
            setRainbowLedColorRaw(i, red, green, blue);
        }
        showRainbowBuffer(); // Refresh the LEDs
    }


    /**
     * Color Wipe effect on the Rainbow strip.
     * LEDs light up one by one in a selected color.
     * @param color the color to wipe
     * @param delay time between each LED lighting in ms
     */
    //% subcategory="Rainbow"
    //% blockId="rainbow_color_wipe"
    //% block="color wipe with %color|delay %delay s"
    //% group=Effects weight=80 blockGap=8
    //% color.shadow="brightColorNumberPicker"
    export function rainbowColorWipe(color: number, delay: number): void {
        let red = (color >> 16) & 0xFF;
        let green = (color >> 8) & 0xFF;
        let blue = color & 0xFF;

        for (let i = 0; i < rainbowNumLeds; i++) {
            setRainbowLedColorRaw(i, red, green, blue);
            showRainbowBuffer();
            basic.pause(delay * 1000);
        }
    }

    /**
     * Rainbow cycle effect on the Rainbow strip.
     * Displays a smooth rainbow transition across all LEDs.
     * @param duration total duration of the rainbow cycle in seconds
     */
    //% subcategory="Rainbow"
    //% blockId="rainbow_rainbow_cycle"
    //% block="rainbow cycle for %duration s"
    //% group=Effects weight=75 blockGap=8
    export function rainbowCycle(duration: number): void {
        let steps = 255; // Number of color steps
        let stepTime = (duration * 1000) / steps; // Time per step in ms

        for (let j = 0; j < steps; j++) {
            for (let i = 0; i < rainbowNumLeds; i++) {
                let color = wheel((i * 256 / rainbowNumLeds + j) & 255);
                let red = (color >> 16) & 0xFF;
                let green = (color >> 8) & 0xFF;
                let blue = color & 0xFF;
                setRainbowLedColorRaw(i, red, green, blue);
            }
            showRainbowBuffer();
            basic.pause(stepTime);
        }
    }

    /**
     * Helper function to generate a color from the wheel position
     * @param position wheel position (0-255)
     */
    function wheel(position: number): number {
        if (position < 85) {
            return (position * 3 << 16) | ((255 - position * 3) << 8);
        } else if (position < 170) {
            position -= 85;
            return ((255 - position * 3) << 16) | (position * 3);
        } else {
            position -= 170;
            return (position * 3 << 8) | (255 - position * 3);
        }
    }

    /**
     * Twinkle effect on the Rainbow strip.
     * Random LEDs light up briefly.
     * @param color the color of the twinkle
     * @param duration total duration of the twinkle effect in seconds
     */
    //% subcategory="Rainbow"
    //% blockId="rainbow_twinkle_effect"
    //% block="twinkle with %color|for %duration s"
    //% group=Effects weight=70 blockGap=8
    //% color.shadow="brightColorNumberPicker"
    export function rainbowTwinkle(color: number, duration: number): void {
        let endTime = input.runningTime() + duration * 1000;
        while (input.runningTime() < endTime) {
            let index = Math.randomRange(0, rainbowNumLeds - 1);
            let red = (color >> 16) & 0xFF;
            let green = (color >> 8) & 0xFF;
            let blue = color & 0xFF;

            setRainbowLedColorRaw(index, red, green, blue);
            showRainbowBuffer();
            basic.pause(100);

            setRainbowLedColorRaw(index, 0, 0, 0); // Turn off the LED
            showRainbowBuffer();
            basic.pause(100);
        }
    }


    /**
     * Theater Chase effect on the Rainbow strip.
     * A pattern of moving dots in a specific color.
     * @param color the color of the chase
     * @param duration total duration of the chase effect in seconds
     */
    //% subcategory="Rainbow"
    //% blockId="rainbow_theater_chase"
    //% block="theater chase with color %color|for %duration|s"
    //% group=Effects weight=65 blockGap=8
    //% color.shadow="brightColorNumberPicker"
    export function rainbowTheaterChase(color: number, duration: number): void {
        let red = (color >> 16) & 0xFF;
        let green = (color >> 8) & 0xFF;
        let blue = color & 0xFF;

        let endTime = input.runningTime() + duration * 1000; // Duration in milliseconds

        while (input.runningTime() < endTime) {
            for (let q = 0; q < 3; q++) {
                // Light up every 3rd LED starting at position q
                for (let i = 0; i < rainbowNumLeds; i += 3) {
                    let index = i + q;
                    if (index < rainbowNumLeds) {
                        setRainbowLedColorRaw(index, red, green, blue);
                    }
                }
                showRainbowBuffer();
                basic.pause(50);

                // Turn off the same LEDs
                for (let i = 0; i < rainbowNumLeds; i += 3) {
                    let index = i + q;
                    if (index < rainbowNumLeds) {
                        setRainbowLedColorRaw(index, 0, 0, 0); // Turn off the LED
                    }
                }
                showRainbowBuffer();
                basic.pause(50);
            }
        }

        // Clear all LEDs after the duration ends
        clearRainbow();
    }

    /**
     * Wave effect on the Rainbow strip.
     * Brightness varies across the strip in a sine wave pattern.
     * @param color the base color of the wave
     * @param duration total duration of the wave effect in seconds
     */
    //% subcategory="Rainbow"
    //% blockId="rainbow_wave_effect"
    //% block="wave effect with %color|for %duration s"
    //% group=Effects weight=60 blockGap=8
    //% color.shadow="brightColorNumberPicker"
    export function rainbowWave(color: number, duration: number): void {
        let red = (color >> 16) & 0xFF;
        let green = (color >> 8) & 0xFF;
        let blue = color & 0xFF;

        let steps = 255;
        let stepTime = (duration * 1000) / steps;

        for (let j = 0; j < steps; j++) {
            for (let i = 0; i < rainbowNumLeds; i++) {
                let brightness = (Math.sin((i + j) * Math.PI / 180) + 1) * 127.5; // Sine wave
                setRainbowLedColorRaw(i, (red * brightness) / 255, (green * brightness) / 255, (blue * brightness) / 255);
            }
            showRainbowBuffer();
            basic.pause(stepTime);
        }
    }
}

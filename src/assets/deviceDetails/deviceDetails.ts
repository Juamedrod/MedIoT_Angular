const ESP32 = [`ESP32 is a series of low-cost, low-power system on a chip microcontrollers with integrated Wi-Fi and dual-mode Bluetooth. The ESP32 series employs either a Tensilica Xtensa LX6 microprocessor in both dual-core and single-core variations, Xtensa LX7 dual-core microprocessor or a single-core RISC-V microprocessor and includes built-in antenna switches, RF balun, power amplifier, low-noise receive amplifier, filters, and power-management modules`, `ESP32 is created and developed by Espressif Systems, a Shanghai-based Chinese company, and is manufactured by TSMC using their 40 nm process.[2] It is a successor to the ESP8266 microcontroller. `, `Features of the ESP32 include the following:[3]`, `

Processors:
CPU: Xtensa dual-core (or single-core) 32-bit LX6 microprocessor, operating at 160 or 240 MHz and performing at up to 600 DMIPS
Ultra low power (ULP) co-processor
Memory: 320 KiB RAM, 448 KiB ROM
Wireless connectivity:
Wi-Fi: 802.11 b/g/n
Bluetooth: v4.2 BR/EDR and BLE (shares the radio with Wi-Fi)
Peripheral interfaces:
34 × programmable GPIOs
12-bit SAR ADC up to 18 channels
2 × 8-bit DACs
10 × touch sensors (capacitive sensing GPIOs)
4 × SPI
2 × I²S interfaces
2 × I²C interfaces
3 × UART
SD/SDIO/CE-ATA/MMC/eMMC host controller
SDIO/SPI slave controller
Ethernet MAC interface with dedicated DMA and planned IEEE 1588 Precision Time Protocol support[4]
CAN bus 2.0
Infrared remote controller (TX/RX, up to 8 channels)
Motor PWM
LED PWM (up to 16 channels)
Hall effect sensor
Ultra low power analog pre-amplifier
`, `
Security:
IEEE 802.11 standard security features all supported, including WPA, WPA2, WPA3 (depending on version)[5] and WAPI
Secure boot
Flash encryption
1024-bit OTP, up to 768-bit for customers
Cryptographic hardware acceleration: AES, SHA-2, RSA, elliptic curve cryptography (ECC), random number generator (RNG)
Power management:
Internal low-dropout regulator
Individual power domain for RTC
5 μA deep sleep current
Wake up from GPIO interrupt, timer, ADC measurements, capacitive touch sensor interrupt`];
const RASPI = ['Raspberry Pi is a series of small single-board computers (SBCs) developed in the United Kingdom by the Raspberry Pi Foundation in association with Broadcom.[15] The Raspberry Pi project originally leaned towards the promotion of teaching basic computer science in schools and in developing countries.[16][17][18] The original model became more popular than anticipated,[19] selling outside its target market for uses such as robotics. It is widely used in many areas, such as for weather monitoring,[20] because of its low cost, modularity, and open design. It is typically used by computer and electronic hobbyists, due to its adoption of HDMI and USB devices', `Raspberry Pi 4 Model B was released in June 2019[2] with a 1.5 GHz 64-bit quad core ARM Cortex-A72 processor, on-board 802.11ac Wi-Fi, Bluetooth 5, full gigabit Ethernet (throughput not limited), two USB 2.0 ports, two USB 3.0 ports, 2-8 GB of RAM, and dual-monitor support via a pair of micro HDMI (HDMI Type D) ports for up to 4K resolution. The version with 1 GB RAM has been abandoned and the prices of the 2 GB version have been reduced. The 8 GB version has a revised circuit board. The Pi 4 is also powered via a USB-C port, enabling additional power to be provided to downstream peripherals, when used with an appropriate PSU. But the Pi can only be operated with 5 volts and not 9 or 12 volts like other mini computers of this class. The initial Raspberry Pi 4 board has a design flaw where third-party e-marked USB cables, such as those used on Apple MacBooks, incorrectly identify it and refuse to provide power.[30][31] Tom's Hardware tested 14 different cables and found that 11 of them turned on and powered the Pi without issue.[32] The design flaw was fixed in revision 1.2 of the board, released in late 2019.[33] In mid-2021, Pi 4 B models appeared with the improved Broadcom BCM2711C0. The manufacturer is now using this chip for the Pi 4 B and Pi 400. However, the tack frequency of the Pi 4 B was not increased in the factory.`];
const ARDUINO = ['Arduino (/ɑːrˈdwiːnoʊ/) is an open-source hardware and software company, project, and user community that designs and manufactures single-board microcontrollers and microcontroller kits for building digital devices. Its hardware products are licensed under a CC-BY-SA license, while software is licensed under the GNU Lesser General Public License (LGPL) or the GNU General Public License (GPL),[1] permitting the manufacture of Arduino boards and software distribution by anyone. Arduino boards are available commercially from the official website or through authorized distributors.Arduino board designs use a variety of microprocessors and controllers. The boards are equipped with sets of digital and analog input/output (I/O) pins that may be interfaced to various expansion boards (\'shields\') or breadboards (for prototyping) and other circuits. The boards feature serial communications interfaces, including Universal Serial Bus (USB) on some models, which are also used for loading programs. The microcontrollers can be programmed using the C and C++ programming languages, using a standard API which is also known as the Arduino language, originated from the Processing language. In addition to using traditional compiler toolchains, the Arduino project provides an integrated development environment (IDE) and a command line tool developed in Go.', `Arduino microcontrollers are pre-programmed with a boot loader that simplifies uploading of programs to the on-chip flash memory. The default bootloader of the Arduino Uno is the Optiboot bootloader.[32] Boards are loaded with program code via a serial connection to another computer. Some serial Arduino boards contain a level shifter circuit to convert between RS-232 logic levels and transistor–transistor logic (TTL) level signals. Current Arduino boards are programmed via Universal Serial Bus (USB), implemented using USB-to-serial adapter chips such as the FTDI FT232. Some boards, such as later-model Uno boards, substitute the FTDI chip with a separate AVR chip containing USB-to-serial firmware, which is reprogrammable via its own ICSP header. Other variants, such as the Arduino Mini and the unofficial Boarduino, use a detachable USB-to-serial adapter board or cable, Bluetooth or other methods. When used with traditional microcontroller tools, instead of the Arduino IDE, standard AVR in-system programming (ISP) programming is used.`];

export { ESP32, RASPI, ARDUINO };
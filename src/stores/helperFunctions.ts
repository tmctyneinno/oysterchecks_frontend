import Swal from 'sweetalert2'

import { useDateFormat, useOnline, useTimeAgo } from '@vueuse/core';
import { createPopper, type VirtualElement } from '@popperjs/core'
import CryptoJS from 'crypto-js';

type DebounceFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;


export default {

    isValidEmail: (email: string) => {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email)
    },

    validatePhoneNo: (value: string) => {
        if (!value) return true;
        // Check if the phone number starts with '+' and contains only digits after that but allow spaces
        value = value.replace(/\s+/g, ''); // Remove spaces
        // also check if length is more than 10
        return /^\+?\d+$/.test(value) && value.length >= 10;
    },



    isExtension: (fileName: string, requiredFormats: string[]) => {
        const regex = new RegExp('[^.]+$');
        const ext: any = fileName.match(regex);
        // get the extension
        const fileExtension = ext[0].toLowerCase()
        //make sure the file is a valid  format
        if (!(requiredFormats.some(x => x == fileExtension.toLowerCase()))) return false
        else return true
    },

    passwordRegex: (password: string) => {
        /*Minimum of 8 characters, One special character,  A number*/
        if (!password || password.length < 8) return false;
        if (!/\d/.test(password)) return false;
        if (!/[!@#$%^&*(),.?":{}|<>\-_]/.test(password)) return false;
        return true;
    },

    truncateStr(str: string, num: number) {
        if (str && str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    },

    toast: (title: string, icon: 'warning' | 'success' | 'error' | 'info', text?: string) => {
        Swal.fire({
            toast: true,
            // text: `${text}` ,
            icon: `${icon}`,
            title: `${title}`,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: false,
            // padding: 10,
        })
    },

    toastShort: (text: string) => {
        Swal.fire({
            toast: true,
            text: `${text}`,
            position: 'top-right',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            padding: 10,
        })
    },

    confirm: (title: string = '', text: string = '', btnText: string) => {
        return Swal.fire({
            title: `${title}`,
            text: `${text}`,
            // icon: 'question',
            // iconColor: '#233c76',
            showCancelButton: true,
            confirmButtonText: `${btnText}`,
            cancelButtonText: 'CANCEL',
            confirmButtonColor: '#6e788117',
            reverseButtons: true,
            width: '300px',
            allowEscapeKey: true,
            customClass: {
                confirmButton: ' text-uppercase text-theme hover-tiltY',
                cancelButton: 'bg-transparent text-muted hover-tiltY',
            },
        })
    },

    confirmDelete: (title: string, text: string, btnText: string) => {
        return Swal.fire({
            title: `${title}`,
            text: `${text}`,
            // icon: 'warning',
            // iconColor: '#dc3545',
            color: '#dc3545',
            showCancelButton: true,
            confirmButtonText: `${btnText}`,
            cancelButtonText: 'CANCEL',
            confirmButtonColor: '#6e788117',
            reverseButtons: true,
            width: '300px',
            allowEscapeKey: true,
            customClass: {
                confirmButton: ' text-uppercase text-danger hover-tiltY',
                cancelButton: 'bg-transparent text-muted hover-tiltY',
            },
        })
    },

    addCommas: (numb: any) => {
        if (isNaN(numb)) return "0";

        // Convert to number and round to two decimal places
        const rounded = Math.round(Number(numb) * 100) / 100;

        // Split into integer and decimal parts
        const str = rounded.toString().split(".");

        // Add commas to the integer part
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // Ensure two decimal places for the fractional part
        if (str[1]) str[1] = str[1].padEnd(2, "0");

        return str.join(".");
    },



    isOnline: () => {
        const online = useOnline()
        return online.value;
    },

    capsFirstLetter: (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },

    debounce: <T extends (...args: any[]) => any>(func: T, delay: number): DebounceFunction<T> => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        return (...args: Parameters<T>) => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    },

    greet: () => {
        const currentTime = new Date().getHours();
        return currentTime < 12
            ? "Good morning"
            : currentTime < 18
                ? "Good afternoon"
                : "Good evening";
    },

    dateDisplay: (date: Date | string, format = 'MMM D, YYYY') => {

        if (!date) return '-';

        // If the date is a string, attempt to convert it to a Date
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return '-';
        }

        const dd = useDateFormat(parsedDate, format);
        return dd.value;
    },

    dateTimeDisplay: (date: Date | string, format = 'MMM D, YYYY   hh:mm a') => {

        if (!date) return '-';

        // If the date is a string, attempt to convert it to a Date
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return '-';
        }

        const dd = useDateFormat(parsedDate, format);
        return dd.value;
    },

    timeAgo: (date: Date) => {
        const timeAgo = useTimeAgo(new Date(date));
        return timeAgo.value;
    },

    addDaysToDate: (data: Date, num: number) => {
        const movedDate = new Date(data);
        movedDate.setDate(movedDate.getDate() + num);
        return movedDate;
    },

    vueSelectPositionCalc: (dropdownList: HTMLElement, component: { $refs: { toggle: Element | VirtualElement; }; $el: { classList: { toggle: (arg0: string, arg1: boolean) => void; }; }; }, { width }: any) => {
        dropdownList.style.width = width

        const calculatePlacement = () => {
            const rect = component.$refs.toggle.getBoundingClientRect()
            const viewportHeight = window.innerHeight

            const spaceAbove = rect.top
            const spaceBelow = viewportHeight - rect.bottom

            return spaceBelow < spaceAbove ? 'top' : 'bottom'
        }

        const placement = calculatePlacement()

        const popper = createPopper(component.$refs.toggle, dropdownList, {
            placement: placement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, -1],
                    },
                },
                {
                    name: 'toggleClass',
                    enabled: true,
                    phase: 'write',
                    fn({ state }) {
                        component.$el.classList.toggle(
                            'drop-up',
                            state.placement === 'top'
                        )
                    },
                },
            ],
        })

        return () => popper.destroy()
    },


    arrayPropSum(array: any[], prop: string) {
        return array.reduce((total: number, array: any) => total + parseFloat(array[prop]), 0)
    },

    isValidUrl(url: string) {
        if (!url) return false; // Ensure the URL is not empty
        const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(\/.*)?$/;
        return regex.test(url);
    },

    generateCode: (digits: number = 4, withNumbers: boolean = true, withSpecialCharacters: boolean = false) => {
        let charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (withNumbers) charset += '0123456789';
        if (withSpecialCharacters) charset += '!@#$%^&*()';

        let result = '';
        for (let i = 0; i < digits; i++) {
            result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return result;
    },

    generateTimeOptions: (startHour: number, endHour: number) => {
        const times = [];
        for (let hour = startHour; hour <= endHour; hour++) {
            const isPM = hour >= 12;
            const displayHour = hour % 12 || 12;
            const label = `${displayHour}${isPM ? 'PM' : 'AM'}`;
            const value = `${hour < 10 ? '0' : ''}${hour}:00`;
            times.push({ value, label });
        }

        return times;
    },

    encodeToBase64: (input: any) => {
        // Validate if the input is already a valid Base64 string
        function isBase64(str: string) {
            try {
                return btoa(atob(str)) === str;
            } catch (err) {
                return false;
            }
        }

        // If input is not a string, convert it to one
        if (typeof input !== "string") {
            input = String(input);
        }

        // Encode only if not already a valid Base64 string
        if (!isBase64(input)) {
            return btoa(input);
        }

        // Return input unchanged if it's already valid Base64
        return input;
    },


    encrypedLoginCredentials: (email: string, password: string) => {
        const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_SECRET_KEY);
        const iv = CryptoJS.lib.WordArray.random(16);
        const combined = email + 'oystercheck' + password;

        const encrypted = CryptoJS.AES.encrypt(combined, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });

        return {
            c: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
            iv: iv.toString(CryptoJS.enc.Base64),
            t: Date.now(),
            v: 1,
        };
    }
}
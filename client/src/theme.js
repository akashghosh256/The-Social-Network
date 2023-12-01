

// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};


// The `...` in the context of JavaScript (particularly in object literals) is called the spread syntax. In the provided code 
// snippet, the spread syntax is used to conditionally spread additional properties into the `palette` object based on the value of the 
// `mode` variable.

// Let's break down the specific part of the code:

// ```javascript
// palette: {
//   mode: mode,
//   ...(mode === "dark"
    
// ? {
//         // properties for dark mode
//       }
    
// : {
//         // properties for light mode
//       }),
// },
// ```

// Here's how 
// it works:

// 1. `mode: mode,`: This sets the `mode` property of the `palette` object to the value of the `mode` variable. It's 
// a standard key-value pair.

// 2. `...(mode === "dark" ? { /* properties for dark mode */ } : { /* properties for 
// light mode */ }),`: This is the spread syntax, and it's used to conditionally include properties in the `palette` object based 
// on whether the `mode` is "dark" or not.

//    - If `mode` is "dark," it spreads the properties for dark 
// mode into the `palette` object.
//    - If `mode` is not "dark," it spreads the properties for light mode into 
// the `palette` object.

// Here's the equivalent code without using the spread syntax:

// ```javascript
// palette: {
//   mode: mode,
//   // Additional properties for dark 
// mode if mode is "dark"
//   ...(mode === "dark"
//     ? {
        
// // darkModeProperty1: value1,
//         // darkModeProperty2: value2,
//         // 
// ...
//       }
//     : {}),
//   // Additional properties for light mode if mode is not "dark"
//   ...(mode 
// !== "dark"
//     ? {
//         // lightModeProperty1: value1,
        
// // lightModeProperty2: value2,
//         // ...
//       }
    
// : {}),
// },
// ```

// Using the spread syntax makes the code more concise and readable. It's a shorthand way to conditionally include properties in 
// an object literal. 
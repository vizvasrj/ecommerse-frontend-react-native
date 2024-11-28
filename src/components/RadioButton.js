import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const RadioButton = ({ label, selected, onSelect, style }) => {
    return (
      <TouchableOpacity onPress={onSelect} style={style}>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            {selected && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: '#000',
                }}
              />
            )}
          </View>
          <Text>{label}</Text>
        </View>
      </TouchableOpacity>
    );
};

export default RadioButton;
  
//   import React, { useState } from 'react';
//   import { View, Text } from 'react-native';
//   import RadioButton from './RadioButton';
  
//   const MyComponent = () => {
//     const [selectedOption, setSelectedOption] = useState('Option 1');
  
//     const options = ['Option 1', 'Option 2', 'Option 3'];
  
//     return (
//       <View>
//         {options.map((option) => (
//           <RadioButton
//             key={option}
//             label={option}
//             selected={selectedOption === option}
//             onSelect={() => setSelectedOption(option)}
//           />
//         ))}
//         <Text>Selected Option: {selectedOption}</Text>
//       </View>
//     );
//   };
  
//   export default MyComponent;
  

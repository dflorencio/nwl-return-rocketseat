import React, { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';

import  BottomSheet  from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC} from 'react-native-gesture-handler'


import { Options } from '../Options'; 
import { Form } from '../Form';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';

export type FeedbackType = keyof typeof feedbackTypes;



export function Widget() {


  const BottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen(){
    BottomSheetRef.current?.expand();
  }
  return (
  
        <>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleOpen}
          >

            
          <ChatTeardropDots
            size={24}
            weight="bold"
            color={theme.colors.text_on_brand_color}
          />

        </TouchableOpacity>

        <BottomSheet
          ref={BottomSheetRef}
          snapPoints={[1,280]}
          backgroundStyle={styles.modal}
          handleIndicatorStyle={styles.indicator}
        >
          <Form
            feedbackType="IDEA"
          />  
        </BottomSheet>

        </>
    
  );
}

export default gestureHandlerRootHOC(Widget);
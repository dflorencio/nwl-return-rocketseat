

import React, { useState } from 'react';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
 } from 'react-native';
 import { ArrowLeft } from 'phosphor-react-native';
 import{ captureScreen } from 'react-native-view-shot';
 import { theme } from '../../theme'
 
import * as FileSystem from 'expo-file-system';
import { styles } from './styles';
import { FeedbackType }  from '../../components/widget';
import { ScreenshotButton }  from '../ScreenshotButton';
import { Button }  from '../../components/Button';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { api } from '../../libs/api';


interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () =>void;
    onFeedbackSent: () =>void;
};

export function Form( {feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) {

    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [ screenshot, setScreenshot ] = useState<string | null>(null);
    const [comment, setComment] = useState('')

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleSreenshot(){
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then(uri => setScreenshot(uri))
        .catch(error => console.log(error));
    }

    function handleSreenshotRemove() {
        setScreenshot(null);
    }
    

    async function handleSendFeedback(){
        if(isSendingFeedback){
            return;
        }
        setIsSendingFeedback(true);

        const screenshotBase64 = screenshot && FileSystem
        try{
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot,
                comment,
            });
            onFeedbackSent();
        }catch(error){
            console.log(error);
            setIsSendingFeedback(false);
        }

    } 



  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackCanceled}>
                <ArrowLeft
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}
                />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Image 
                    source={feedbackTypeInfo.image}
                    style={styles.image}
                
                /> 
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}

                </Text>
            </View>

        </View>

        <TextInput 
            multiline
            style={styles.input}
            placeholder="Algo não esta funcionando bem? Queremos Corrigir. Conte com detalhes o que está acontendo..."
            placeholderTextColor={theme.colors.text_secondary}
            autoCorrect={false}
            onChangeText={setComment}
            />

            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeShot={handleSreenshot}
                    onRemoveShot={handleSreenshotRemove}
                    screenshot={screenshot}
                    />

            <Button
            onPress={handleSendFeedback}
                isLoading={isSendingFeedback}
            />


            </View>

    </View>
  );
}
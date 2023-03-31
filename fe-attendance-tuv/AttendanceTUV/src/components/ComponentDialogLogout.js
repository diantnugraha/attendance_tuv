import * as React from 'react';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';

export default function LogoutDialog({visible, onDismiss, onLogout}) {
  return (
    <>
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss}>
          <Dialog.Title>Confirm Logout</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to log out?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="outlined"
              textColor="#001ED2"
              contentStyle={{paddingHorizontal: '2%'}}
              onPress={onDismiss}>
              Cancel
            </Button>
            <Button
              mode="contained"
              textColor="#FFFFFF"
              buttonColor="#001ED2"
              contentStyle={{paddingHorizontal: '6%'}}
              onPress={onLogout}>
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

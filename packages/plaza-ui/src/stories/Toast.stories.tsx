import {Meta, Story} from '@storybook/react';
import React, {ReactText} from 'react';

import {Grid} from '../components';
import Button from '../components/Button/Button';
import {useToast} from '../hooks/useToast';

type ToastComponentProps = {
  text?: string;
};

const ToastComponent = ({
  text = 'این پیغام جنبه نمایش دارد ',
}: ToastComponentProps) => {
  const toast = useToast();
  const toastId = React.useRef<null | ReactText>(null);

  const getToast = () => {
    toastId.current = toast({text});
  };
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Button onClick={getToast}>Toast</Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() =>
            toast.info({
              text,
              alertType: 'inline',
              autoClose: false,
              variant: 'filled',
              size: 'small',
            })
          }
          color="info"
        >
          InfoToast
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={() => toast.warning({text})} color="warning">
          WarningToast
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={() => toast.error({text})} color="danger">
          ErrorToast
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={() => toast.success({text})} color="success">
          SuccessToast
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={() => toast.dismissAll()} color="surface">
          DismissAll
        </Button>
      </Grid>
      <Grid item>
        <Button
          onClick={() =>
            toastId.current
              ? toast.update(toastId.current, {
                  text: 'Toast Updated',
                  transition: toast.transition.Zoom,
                })
              : undefined
          }
          color="surface"
        >
          updateLast
        </Button>
      </Grid>
    </Grid>
  );
};

export default {
  title: 'Feedback/Toast',
  component: ToastComponent,
  argTypes: {},
} as Meta;

const Template: Story = args => <ToastComponent {...args} />;

export const Toast = Template.bind({});

Toast.args = {};

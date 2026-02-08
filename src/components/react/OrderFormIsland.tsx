import {
  Box,
  Button,
  Callout,
  Card,
  Checkbox,
  Flex,
  Grid,
  RadioGroup,
  Select,
  Text,
  TextArea,
  TextField,
  Theme
} from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import '../../styles/react/order-form-island.css';
import type { OrderApiResponse, OrderFormErrors, OrderFormValues } from './order-form.types';

export interface OrderFormIslandProps {
  minimumLeadDays: number;
  endpoint?: string;
}

const INITIAL_VALUES: OrderFormValues = {
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  occasion: '',
  cakeType: '',
  cakeSize: '',
  servings: '',
  flavor: '',
  designNotes: '',
  budget: '',
  fulfillmentType: '',
  allergies: '',
  referenceUrlsText: '',
  consent: false,
  website: ''
};

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseReferenceUrls(value: string): string[] {
  return value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeFieldErrors(fieldErrors: Record<string, string> | undefined): OrderFormErrors {
  if (!fieldErrors) {
    return {};
  }

  const mapped: OrderFormErrors = {};
  for (const [field, value] of Object.entries(fieldErrors)) {
    mapped[field as keyof OrderFormErrors] = value;
  }

  return mapped;
}

export default function OrderFormIsland({ minimumLeadDays, endpoint = '/api/orders' }: OrderFormIslandProps) {
  const [values, setValues] = useState<OrderFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<OrderFormErrors>({});
  const [status, setStatus] = useState<SubmissionState>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + minimumLeadDays);
    return toIsoDate(date);
  }, [minimumLeadDays]);

  const setField = <K extends keyof OrderFormValues>(field: K, value: OrderFormValues[K]) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  };

  const updateInput =
    <K extends keyof OrderFormValues>(field: K) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setField(field, event.target.value as OrderFormValues[K]);
    };

  const renderError = (key: keyof OrderFormErrors) => {
    const message = errors[key];
    return message ? (
      <Text className="order-form__error" color="red" size="1" as="p" role="alert">
        {message}
      </Text>
    ) : (
      <Box className="order-form__error-spacer" />
    );
  };

  const submitOrder = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setStatus('submitting');
    setStatusMessage('Submitting your request...');

    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      eventDate: values.eventDate,
      occasion: values.occasion,
      cakeType: values.cakeType,
      cakeSize: values.cakeSize,
      servings: Number(values.servings || 0),
      flavor: values.flavor,
      designNotes: values.designNotes,
      budget: values.budget,
      fulfillmentType: values.fulfillmentType,
      allergies: values.allergies,
      referenceUrls: parseReferenceUrls(values.referenceUrlsText),
      consent: values.consent,
      website: values.website
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as OrderApiResponse;

      if (!response.ok || !data.ok) {
        const message = data.ok ? 'Please review your form and try again.' : data.message;
        const fieldErrors = data.ok ? {} : normalizeFieldErrors(data.fieldErrors);

        setErrors(fieldErrors);
        setStatus('error');
        setStatusMessage(message);
        return;
      }

      setValues(INITIAL_VALUES);
      setStatus('success');
      setStatusMessage(`Request sent successfully. Reference ID: ${data.requestId}`);
    } catch {
      setStatus('error');
      setStatusMessage('Something went wrong while sending your request. Please try again.');
    }
  };

  return (
    <Theme appearance="light" accentColor="teal" grayColor="slate" radius="large" scaling="100%">
      <Card className="order-form-card">
        <form className="order-form" onSubmit={submitOrder} noValidate>
          <Grid columns={{ initial: '1', md: '2' }} gap="4">
            <label className="order-field" htmlFor="order-name">
              <Text as="span" size="2" weight="medium">
                Full name *
              </Text>
              <TextField.Root
                id="order-name"
                name="name"
                value={values.name}
                onChange={updateInput('name')}
                autoComplete="name"
                required
              />
              {renderError('name')}
            </label>

            <label className="order-field" htmlFor="order-email">
              <Text as="span" size="2" weight="medium">
                Email *
              </Text>
              <TextField.Root
                id="order-email"
                name="email"
                type="email"
                value={values.email}
                onChange={updateInput('email')}
                autoComplete="email"
                required
              />
              {renderError('email')}
            </label>

            <label className="order-field" htmlFor="order-phone">
              <Text as="span" size="2" weight="medium">
                Phone number
              </Text>
              <TextField.Root
                id="order-phone"
                name="phone"
                value={values.phone}
                onChange={updateInput('phone')}
                autoComplete="tel"
              />
              {renderError('phone')}
            </label>

            <label className="order-field" htmlFor="order-event-date">
              <Text as="span" size="2" weight="medium">
                Event date *
              </Text>
              <TextField.Root
                id="order-event-date"
                name="eventDate"
                type="date"
                value={values.eventDate}
                onChange={updateInput('eventDate')}
                min={minDate}
                required
              />
              {renderError('eventDate')}
            </label>

            <label className="order-field" htmlFor="order-occasion">
              <Text as="span" size="2" weight="medium">
                Occasion *
              </Text>
              <TextField.Root
                id="order-occasion"
                name="occasion"
                placeholder="Birthday, wedding, shower..."
                value={values.occasion}
                onChange={updateInput('occasion')}
                required
              />
              {renderError('occasion')}
            </label>

            <label className="order-field" htmlFor="order-cake-type">
              <Text as="span" size="2" weight="medium">
                Cake type *
              </Text>
              <Select.Root value={values.cakeType} onValueChange={(value) => setField('cakeType', value)}>
                <Select.Trigger id="order-cake-type" placeholder="Select cake type" />
                <Select.Content>
                  <Select.Item value="Buttercream cake">Buttercream cake</Select.Item>
                  <Select.Item value="Fondant cake">Fondant cake</Select.Item>
                  <Select.Item value="Cupcake tower">Cupcake tower</Select.Item>
                  <Select.Item value="Sheet cake">Sheet cake</Select.Item>
                  <Select.Item value="Other">Other</Select.Item>
                </Select.Content>
              </Select.Root>
              {renderError('cakeType')}
            </label>

            <label className="order-field" htmlFor="order-cake-size">
              <Text as="span" size="2" weight="medium">
                Cake size *
              </Text>
              <Select.Root value={values.cakeSize} onValueChange={(value) => setField('cakeSize', value)}>
                <Select.Trigger id="order-cake-size" placeholder="Select size" />
                <Select.Content>
                  <Select.Item value="6 inch">6 inch</Select.Item>
                  <Select.Item value="8 inch">8 inch</Select.Item>
                  <Select.Item value="10 inch">10 inch</Select.Item>
                  <Select.Item value="Tiered">Tiered</Select.Item>
                  <Select.Item value="Sheet pan">Sheet pan</Select.Item>
                  <Select.Item value="Custom">Custom</Select.Item>
                </Select.Content>
              </Select.Root>
              {renderError('cakeSize')}
            </label>

            <label className="order-field" htmlFor="order-servings">
              <Text as="span" size="2" weight="medium">
                Estimated servings *
              </Text>
              <TextField.Root
                id="order-servings"
                name="servings"
                type="number"
                min={1}
                max={500}
                value={values.servings}
                onChange={updateInput('servings')}
                required
              />
              {renderError('servings')}
            </label>

            <label className="order-field" htmlFor="order-flavor">
              <Text as="span" size="2" weight="medium">
                Flavor direction
              </Text>
              <TextField.Root
                id="order-flavor"
                name="flavor"
                placeholder="Vanilla, chocolate, red velvet..."
                value={values.flavor}
                onChange={updateInput('flavor')}
              />
              {renderError('flavor')}
            </label>

            <label className="order-field" htmlFor="order-budget">
              <Text as="span" size="2" weight="medium">
                Budget range *
              </Text>
              <Select.Root value={values.budget} onValueChange={(value) => setField('budget', value)}>
                <Select.Trigger id="order-budget" placeholder="Select budget range" />
                <Select.Content>
                  <Select.Item value="Under $120">Under $120</Select.Item>
                  <Select.Item value="$120-$220">$120-$220</Select.Item>
                  <Select.Item value="$220-$350">$220-$350</Select.Item>
                  <Select.Item value="$350+">$350+</Select.Item>
                </Select.Content>
              </Select.Root>
              {renderError('budget')}
            </label>

            <Box className="order-field">
              <Text as="span" size="2" weight="medium">
                Fulfillment *
              </Text>
              <RadioGroup.Root
                value={values.fulfillmentType}
                onValueChange={(value) => setField('fulfillmentType', value as OrderFormValues['fulfillmentType'])}
              >
                <Flex gap="4" wrap="wrap">
                  <label className="order-radio">
                    <RadioGroup.Item value="pickup" />
                    <Text as="span">Pickup</Text>
                  </label>
                  <label className="order-radio">
                    <RadioGroup.Item value="delivery" />
                    <Text as="span">Delivery</Text>
                  </label>
                </Flex>
              </RadioGroup.Root>
              {renderError('fulfillmentType')}
            </Box>

            <label className="order-field" htmlFor="order-allergies">
              <Text as="span" size="2" weight="medium">
                Allergy or dietary notes
              </Text>
              <TextField.Root
                id="order-allergies"
                name="allergies"
                placeholder="Nut allergy, egg-free, etc."
                value={values.allergies}
                onChange={updateInput('allergies')}
              />
              {renderError('allergies')}
            </label>
          </Grid>

          <label className="order-field" htmlFor="order-design-notes">
            <Text as="span" size="2" weight="medium">
              Design notes *
            </Text>
            <TextArea
              id="order-design-notes"
              name="designNotes"
              rows={6}
              value={values.designNotes}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setField('designNotes', event.target.value)}
              placeholder="Tell us color palette, theme, style, message text, and any details that matter."
              required
            />
            {renderError('designNotes')}
          </label>

          <label className="order-field" htmlFor="order-reference-urls">
            <Text as="span" size="2" weight="medium">
              Inspiration links (one per line)
            </Text>
            <TextArea
              id="order-reference-urls"
              name="referenceUrlsText"
              rows={3}
              value={values.referenceUrlsText}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setField('referenceUrlsText', event.target.value)}
              placeholder="https://..."
            />
            {renderError('referenceUrls')}
          </label>

          <label className="order-consent">
            <Checkbox
              checked={values.consent}
              onCheckedChange={(checked) => setField('consent', checked === true)}
              required
            />
            <Text as="span" size="2">
              I agree to be contacted by Dillz Bites about this order request. *
            </Text>
          </label>
          {renderError('consent')}

          <input
            className="order-honeypot"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={updateInput('website')}
            aria-hidden="true"
          />

          <Flex gap="3" align="center" wrap="wrap">
            <Button size="3" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending request...' : 'Send order request'}
            </Button>
            <Text size="2" color="gray">
              You will receive a confirmation email after successful submission.
            </Text>
          </Flex>

          {status !== 'idle' && (
            <Callout.Root color={status === 'success' ? 'green' : status === 'error' ? 'red' : 'blue'}>
              <Callout.Text>{statusMessage}</Callout.Text>
            </Callout.Root>
          )}
        </form>
      </Card>
    </Theme>
  );
}
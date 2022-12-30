import { Checkbox, Stack, Text, useCheckboxGroup} from "@chakra-ui/react"

export default function Example() {

  const { value, getCheckboxProps } = useCheckboxGroup()
  console.log(value)
  return (
    <Stack>
      <Text>The selected checkboxes are: {value.sort().join(' and ')}</Text>
      <Checkbox {...getCheckboxProps({ value: '1' })} />
      <Checkbox {...getCheckboxProps({ value: '2' })} />
      <Checkbox {...getCheckboxProps({ value: '3' })} />
    </Stack>
  )
}

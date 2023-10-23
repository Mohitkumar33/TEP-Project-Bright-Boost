// import {
//   FormControl,
//   FormLabel,
//   IconButton,
//   Input,
//   InputGroup,
//   InputRightElement,
//   useDisclosure,
//   useMergeRefs,
// } from "@chakra-ui/react";
// import { forwardRef, useRef } from "react";
// import { HiEye, HiEyeOff } from "react-icons/hi";

import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

// export const PasswordField = forwardRef((props, ref) => {
//   const { isOpen, onToggle } = useDisclosure();
//   const inputRef = useRef(null);
//   const mergeRef = useMergeRefs(inputRef, ref);
//   const onClickReveal = () => {
//     onToggle();
//     if (inputRef.current) {
//       inputRef.current.focus({
//         preventScroll: true,
//       });
//     }
//   };
//   return (
//     <FormControl>
//       <FormLabel htmlFor="password">Password</FormLabel>
//       <InputGroup>
//         <InputRightElement>
//           <IconButton
//             variant="text"
//             aria-label={isOpen ? "Mask password" : "Reveal password"}
//             icon={isOpen ? <HiEyeOff /> : <HiEye />}
//             onClick={onClickReveal}
//           />
//         </InputRightElement>
//         <Input
//           id="password"
//           ref={mergeRef}
//           name="password"
//           type={isOpen ? "text" : "password"}
//           autoComplete="current-password"
//           required
//           {...props}
//         />
//       </InputGroup>
//     </FormControl>
//   );
// });
// PasswordField.displayName = "PasswordField";

export const Logo = (props) => {
  return (
    <img
      src="/assets/logos/Bright_boost_transparent.png"
      style={{
        height: props.height,
        width: props.width,
        margin: props?.style?.margin,
      }}
    />
  );
};

export const TeacherTimeTable = () => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          fontWeight: "700",
          marginBottom: "1rem",
        }}
      >
        Subject time table
      </h1>
      <TableContainer>
        <Table variant="simple">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Monday</Th>
              <Th>Tuesday</Th>
              <Th>Wednesday</Th>
              <Th>Thursday</Th>
              <Th>Friday</Th>
              <Th>Saturday</Th>
              <Th>Sunday</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>English</Td>
              <Td>Math</Td>
              <Td>Computer</Td>
              <Td>Science</Td>
              <Td>Sports</Td>
              <Td>Holiday</Td>
              <Td>Holiday</Td>
            </Tr>
            <Tr>
              <Td>Sports</Td>
              <Td>Science</Td>
              <Td>Computer</Td>
              <Td>Math</Td>
              <Td>English</Td>
              <Td>Holiday</Td>
              <Td>Holiday</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>3:30 am to 5:30 pm</Th>
              <Th>3:30 am to 5:30 pm</Th>
              <Th>3:30 am to 5:30 pm</Th>
              <Th>3:30 am to 5:30 pm</Th>
              <Th>3:30 am to 5:30 pm</Th>
              <Th>All Day</Th>
              <Th>All Day</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

// EditContactPage.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditContactPage from "../components/EditContactPage";

const mockContact = {
  email: "test@example.com",
  firstName: "John",
  lastName: "Doe",
};

const mockOnUpdateContact = jest.fn();
const mockOnCancelClick = jest.fn();

describe("EditContactPage Component", () => {
  //check if website renders properly
  it("renders form elements correctly", () => {
    render(
      <EditContactPage
        contact={mockContact}
        onUpdateContact={mockOnUpdateContact}
        onCancelClick={mockOnCancelClick}
      />
    );

    expect(screen.getByText(`${mockContact.email}`)).toBeInTheDocument();
    expect(screen.getByLabelText("First Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name (Optional):")).toBeInTheDocument();
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  //check valid input when only first name is edited, both names will go and first name will be changed
  it('calls the correct function when "Save Changes" button is clicked, first name on;y', async () => {
    render(
      <EditContactPage
        contact={mockContact}
        onUpdateContact={mockOnUpdateContact}
        onCancelClick={mockOnCancelClick}
      />
    );

    fireEvent.change(screen.getByLabelText("First Name:"), {
      target: { value: "UpdatedName" },
    });
    fireEvent.click(screen.getByText("Save Changes"));

    // Check if the onUpdateContact function is called with the correct edited contact data
    await waitFor(() => {
      expect(mockOnUpdateContact).toHaveBeenCalledWith({
        email: "test@example.com",
        firstName: "UpdatedName",
        lastName: "",
      });
    });
  });

  //check valid input when both first and last name is edited, both names will be changed
  it('calls the correct function when "Save Changes" button is clicked, both names', async () => {
    render(
      <EditContactPage
        contact={mockContact}
        onUpdateContact={mockOnUpdateContact}
        onCancelClick={mockOnCancelClick}
      />
    );

    fireEvent.change(screen.getByLabelText("First Name:"), {
      target: { value: "UpdatedName" },
    });
    fireEvent.change(screen.getByLabelText("Last Name (Optional):"), {
      target: { value: "UpdatedLastName" },
    });

    fireEvent.click(screen.getByText("Save Changes"));

    // Check if the onUpdateContact function is called with the correct edited contact data
    await waitFor(() => {
      expect(mockOnUpdateContact).toHaveBeenCalledWith({
        email: "test@example.com",
        firstName: "UpdatedName",
        lastName: "UpdatedLastName",
      });
    });
  });

  it('calls the correct function when "Cancel" button is clicked', () => {
    render(
      <EditContactPage
        contact={mockContact}
        onUpdateContact={mockOnUpdateContact}
        onCancelClick={mockOnCancelClick}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnCancelClick).toHaveBeenCalled();
  });

  //test for input validations

  it("Gives the correct error message when first name is too short", async () => {
    render(
      <EditContactPage
        contact={mockContact}
        onUpdateContact={mockOnUpdateContact}
        onCancelClick={mockOnCancelClick}
      />
    );

    fireEvent.change(screen.getByLabelText("First Name:"), {
      target: { value: "ss" },
    });
    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(screen.getByText("First Name too short")).toBeInTheDocument();
    });
  });

  //check ivalid input when only first name is edited, first name error will be displayed
  it("Gives the correct message when first name is too big", async () => {
    render(
      <EditContactPage
        contact={mockContact}
        onUpdateContact={mockOnUpdateContact}
        onCancelClick={mockOnCancelClick}
      />
    );

    fireEvent.change(screen.getByLabelText("First Name:"), {
      target: { value: "bbbbbbbbbbbbbbbbbbbbbbbbbb" },
    });
    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(screen.getByText("First Name too long")).toBeInTheDocument();
    });
  });

  //check ivalid input when only last name is edited,
  it("Gives the correct error message when last name is too short", async () => {
    render(
      <EditContactPage
        contact={mockContact}
        onUpdateContact={mockOnUpdateContact}
        onCancelClick={mockOnCancelClick}
      />
    );

    fireEvent.change(screen.getByLabelText("Last Name (Optional):"), {
      target: { value: "s" },
    });
    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(
        screen.getByText("Last name has to be between 2 and 30 characters")
      ).toBeInTheDocument();
    });
  });

  //check ivalid input when only last name is edited
  it("Gives the correct message when last name is too big", async () => {
    render(
      <EditContactPage
        contact={mockContact}
        onUpdateContact={mockOnUpdateContact}
        onCancelClick={mockOnCancelClick}
      />
    );

    fireEvent.change(screen.getByLabelText("Last Name (Optional):"), {
      target: { value: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" },
    });
    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(
        screen.getByText("Last name has to be between 2 and 30 characters")
      ).toBeInTheDocument();
    });
  });
});

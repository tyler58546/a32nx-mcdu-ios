//
//  PaddedTextField.swift
//  A32NX MCDU
//
//  Created by Tyler Knox on 2/9/21.
//

import UIKit

class PaddedTextField: UITextField {

    class TextField: UITextField {

        let padding = UIEdgeInsets(top: 0, left: 15, bottom: 0, right: 15)

        override open func textRect(forBounds bounds: CGRect) -> CGRect {
            return bounds.inset(by: padding)
        }

        override open func placeholderRect(forBounds bounds: CGRect) -> CGRect {
            return bounds.inset(by: padding)
        }

        override open func editingRect(forBounds bounds: CGRect) -> CGRect {
            return bounds.inset(by: padding)
        }
    }

}

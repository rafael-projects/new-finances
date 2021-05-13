const Modal = {
    open() {
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close() {
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')


    }
}

const Transaction = {
    all: [
        {
            description: 'Luz',
            amount: -500010,
            date: '27/04/2021'
        }, {
            
            description: 'Web Site',
            amount: 500000,
            date: '27/04/2021'
        }, {
            
            description: 'Internet',
            amount: -200000,
            date: '27/04/2021'
        },
        {
            
            description: 'App',
            amount: 200020,
            date: '27/04/2021'
        }
        
    ],
    add(transaction) {
        Transaction.all.push(transaction);

        App.reload();
    },
    remove(index) {
        Transaction.all.splice(index,  1);

        App.reload();
    },
    incomes() {
        let income = 0;
        //somar as transactions
        Transaction.all.forEach(transaction => {
            //verificar se é maior que zero
            if (transaction.amount > 0) {
                //se maior que zero
                //somar a uma variavel e retorna-lá

                income += transaction.amount;
            }
        })
        return income;
    },
    expenses() {
        //somar as saidas
        let expense = 0;
        //somar as transactions
        Transaction.all.forEach(transaction => {
            //verificar se é menor que zero
            if (transaction.amount < 0) {
                //se menor que zero
                //somar a uma variavel e retorna-lá
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total() {
        //entardas - saidas = total
        return Transaction.incomes() + Transaction.expenses();
    }

}
//pegar as transações do meu 
//objeto em JS e colocar no Html
const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        const amount = Utils.formatCurrency(transaction.amount);


        const html = `
                    <td class="description">${transaction.description}</td>
                    <td class="${CSSclass}">${amount}</td>
                    <td class="date"> ${transaction.date}</td>
                    <td>
                        <img src="./assets/minus.svg" alt="Remover Transação">
                    </td>
                `//end

        return html
    },
    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes());

        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses());

        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransaction() {
        DOM.transactionsContainer.innerHTML = " ";
    }


}
//estrutura responsável pela formatação dos valores
const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : " ";

        value = String(value).replace(/\D/g, "");

        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });


        return signal + value;
    }
}

const Form ={
    description: document.querySelector('input#description' ),
    amount: document.querySelector('input#amount' ),
    date: document.querySelector('input#date' ),

    getValues() {
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
    formatData() {
        console.log('dados formatados!');
    },
    validateFields() {
        const {description, amount, date} = Form.getValues();
        if(description.trim() === "" || 
        amount.trim() === "" ||  
        date.trim() === "") {
            throw new Error('Dados inválidos.');
        }

    },
    submit(event) {
        event.preventDefault()

        try{
        //verificar os campos se validaram corretamente
        Form.validateFields();
        //formatar os dados para salvar
        //Form.formatData();
        //salvar
        //apagar os dados do formulario
        //modal fecha
        //atualizar  a  aplicação
        } catch (error){
            alert(error.message);
        }
    }    
}
//inicia o app, popula as tabelas, limpa as mesmas e reinicia o App
const App = {

    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction);
        })

        DOM.updateBalance()



    },
    reload() {
        DOM.transactionsContainer.innerHTML = " ";
        App.init();
    },
}

App.init();




import React from "react";
import ClientSummary from "../components/ClientSummary";
import Layout from "../Layout/Layout";
import {useState} from "react";
import DatePick from "../components/DatePick";
import {useSelector} from "react-redux";
import {selectBrokerage} from "../../reducers/brokerageReducer";
import Dropdown from "../components/Dropdown";
import {euroSign} from "../../constants/strings";
import TextArea from "../components/TextArea";
import RadioButton from "../components/RadioButton";
import {Button} from "../components/Button";
import ApprovalHistory from "./components/ApprovalHistory";
import SummaryDataList from "../CarePackages/HomeCare/components/SummaryDataList";
import {getHomeCareSummaryData} from "../../api/CarePackages/HomeCareApi";
import EuroInput from "../components/EuroInput";

const stageOptions = [
  { text: "New", value: 1 },
  { text: "Assigned", value: 2 },
  { text: "Querying", value: 3 },
  { text: "Supplier Sourced", value: 4 },
  { text: "Pricing agreed", value: 5 },
  { text: "Submitted For Approval", value: 6 },
];

const categoryOptions = [
  { text: "Category type 1", value: 1 },
  { text: "Category type 2", value: 2 },
  { text: "Category type 3", value: 3 },
];

const reclaimFromOptions = [
  { text: "Reclaim from 1", value: 1 },
  { text: "Reclaim from 2", value: 2 },
  { text: "Reclaim from 3", value: 3 },
];

const approvalHistory = [
  {
    date: '03/12/2021',
    id: 1,
    text: <span>Package requested by <a href=''>Martin Workman</a> · Social Worker</span>,
  },
  {
    date: '05/12/2021',
    id: 2,
    text: <span>
      Futher information requested by
      <a>Amecie Steadman</a> · Approver
      <br/>
      <em>
        "There appears to be more support than needed in the morning for Mr Stephens, please amend or call me to discuss"
        <a href=""> More</a>
        </em>
      </span>,
  },
  {
    date: '06/12/2021',
    id: 3,
    text: <span>Package re-submitted by <a href="">Martin Workman</a> · Social Worker</span>,
  },
  {
    date: '14/12/2021',
    id: 4,
    text: <span>Care Package Approved for brokerage by <a href="">Amecie Steadman</a> · Approver</span>,
  },
  {
    date: '14/12/2021',
    id: 5,
    text: <span>Care Package brokered STA by <a href="">Derek Knightman</a> · Broker</span>,
  },
]

const packageReclaimTypes = [
  {value: 'percentage', text: 'Percentage'},
  {value: 'fixedOneOff', text: 'Fixed amount - one off'},
  {value: 'fixedWeekly', text: 'Fixed amount - weekly'},
];

const supplierOptions = [
  { text: "Supplier type 1", value: 1 },
  { text: "Supplier type 2", value: 2 },
  { text: "Supplier type 3", value: 3 },
  { text: "Supplier type 4", value: 4 },
];

const ProposedPackages = () => {
  const brokerage = useSelector(selectBrokerage);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tab, setTab] = useState('approvalHistory');
  const [summaryData, setSummaryData] = useState([]);
  const [elementsData, setElementsData] = useState({
    '30mCall': 25,
    '45mCall': 22,
    '60m+Call': 20,
    secondaryCarer: 'XX',
    domesticCare: 'XX',
    escortServices: 'XX',
    sleepingNight: 'XX',
    wakingNight: 'XX',
    nightOwl: 'XX',
  });

  const [packageReclaim, setPackageReclaim] = useState({
    type: 'percentage',
    notes: '',
    from: ['NHS Bristol'],
    categoryTypes: ['Category 1', 'Category 2'],
    amount: '888888',
  });

  const changeElementsData = (field, data) => {
    setElementsData({...elementsData, [field]: data});
  };

  const [selectedStageType, setSelectedStageType] = useState(0);
  const [selectedSupplierType, setSelectedSupplierType] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const changePackageType = (option) => {
    setPackageReclaim({
      ...packageReclaim,
      type: option.value,
    });
  }

  const changeTab = (tab) => {
    if(tab === 'packageDetails') {
      setSummaryData(getHomeCareSummaryData());
    }
    setTab(tab);
  }

  return (
    <Layout headerTitle="Rapid D2A">
      <ClientSummary
        client="James Stephens"
        hackneyId="786288"
        age="91"
        preferredContact='Phone'
        canSpeakEnglish='Fluent'
        packagesCount={4}
        dateOfBirth="09/12/1972"
        postcode="E9 6EY"
      >
        Proposed Packages
      </ClientSummary>
      <div className="mt-5 mb-5 person-care">
        <div className="column proposed-packages__header is-flex is-justify-content-space-between">
          <div>
            <h1 className='container-title'>Home Care</h1>
            <h3>ID: <span>{brokerage?.homeCare?.id || ''}</span></h3>
          </div>
          <Dropdown
            label=''
            initialText='Stage'
            options={stageOptions}
            selectedValue={selectedStageType}
            onOptionSelect={(option) => setSelectedStageType(option)}
          />
        </div>
        <div className="column">
          <div className="is-flex is-flex-wrap-wrap">
            <div className="mr-3 is-flex is-align-items-flex-end">
              <Dropdown
                label=''
                initialText='Supplier (please select)'
                options={supplierOptions}
                onOptionSelect={setSelectedSupplierType}
                selectedValue={selectedSupplierType}
              />
            </div>
            <span className="mr-3">
              <DatePick label='Start Date' dateValue={startDate} setDate={setStartDate} />
            </span>
            <span className="mr-3">
              <DatePick label='End Date' dateValue={endDate} setDate={setEndDate} />
            </span>
          </div>
        </div>
        <div className='proposed-packages__elements column'>
          <h2>Elements</h2>
          <div className='mb-4 is-flex is-flex-wrap-wrap is-justify-content-space-between'>
            <div className='elements-column'>
              <div className='elements-row'>
                <div />
                <div className='bold-text'>/hr</div>
                <div className='bold-text'>hrs/wk</div>
                <div className='bold-text'>Total</div>
              </div>
              <div className='elements-row'>
                <div>Primary Carer</div>
                <div/>
                <div className='bold-text'>3</div>
                <div className='bold-text'>{euroSign}XX</div>
              </div>
              <div className='elements-sub-column'>
                <div className='elements-row'>
                  <div>30m call</div>
                  <div><EuroInput onChange={value => changeElementsData('30mCall', value)} value={elementsData['30mCall']} /></div>
                  <div>3</div>
                  <div>{euroSign}75</div>
                </div>
                <div className='elements-row'>
                  <div>45m call</div>
                  <div><EuroInput onChange={value => changeElementsData('45mCall', value)} value={elementsData['45mCall']} /> </div>
                  <div>3</div>
                  <div>{euroSign}66</div>
                </div>
                <div className='elements-row'>
                  <div>60m+ call</div>
                  <div><EuroInput onChange={value => changeElementsData('60m+Call', value)} value={elementsData['60m+Call']} /></div>
                  <div>3</div>
                  <div>{euroSign}60</div>
                </div>
                <br/>
                <div className='elements-row'>
                  <div><p>Secondary Carer</p></div>
                  <div>
                    <EuroInput
                      onChange={value => changeElementsData('secondaryCarer', value)}
                      value={elementsData['secondaryCarer']}
                    />
                  </div>
                  <div>3</div>
                  <div>{euroSign}48</div>
                </div>
                <p className='proposed-packages__split-rate'>Split rate</p>
                <div className='elements-row'>
                  <div>Domestic Care</div>
                  <div>
                    <EuroInput
                      onChange={value => changeElementsData('domesticCare', value)}
                      value={elementsData['domesticCare']}
                    />
                  </div>
                  <div>3</div>
                  <div>{euroSign}48</div>
                </div>
                <div className='elements-row'>
                  <div>Escort Services</div>
                  <div>
                    <EuroInput
                      onChange={value => changeElementsData('escortServices', value)}
                      value={elementsData['escortServices']}
                    />
                  </div>
                  <div>3</div>
                  <div>{euroSign}48</div>
                </div>
              </div>
            </div>
            <div className='vertical-line' />
            <div className='elements-column'>
              <div className='elements-row'>
                <div />
                <div className='bold-text'>/ hr</div>
                <div className='bold-text'>hrs/wk</div>
                <div className='bold-text'>Total</div>
              </div>
              <div className='elements-row'>
                <div>Sleeping Night</div>
                <div>
                  <EuroInput
                    onChange={value => changeElementsData('sleepingNight', value)}
                    value={elementsData['sleepingNight']}
                  />
                </div>
                <div>3</div>
                <div>{euroSign}300</div>
              </div>
              <div className='elements-row'>
                <div>Waking Night</div>
                <div>
                  <EuroInput
                    onChange={value => changeElementsData('wakingNight', value)}
                    value={elementsData['wakingNight']}
                  />
                </div>
                <div>3</div>
                <div>{euroSign}300</div>
              </div>
              <div className='elements-row'>
                <div>Night Owl</div>
                <div>
                  <EuroInput
                    onChange={value => changeElementsData('nightOwl', value)}
                    value={elementsData['nightOwl']}
                  />
                </div>
                <div>3</div>
                <div>{euroSign}300</div>
              </div>
            </div>
          </div>
          <div className='proposed-packages__total-cost'>
            <p>Total Cost /WK <span>{euroSign}XXXX</span></p>
          </div>
          {
            tab === 'packageDetails' &&
              <div>
                <div className='mt-4 is-flex is-align-items-center is-justify-content-space-between'>
                  <p className='package-reclaim__text'>Should the cost of this package be reclaimed in
                    part or full from another body, e.g. NHS, CCG, another LA ?
                  </p>
                  <Button className='outline'>Add reclaim</Button>
                </div>
                <hr className='horizontal-delimiter'/>
              </div>
          }
        </div>
        {
          tab === 'approvalHistory' &&
          <div className='package-reclaim'>
            <div className="column">
              <h1>Package reclaim</h1>
              <div className="mr-3 is-flex is-align-items-flex-end is-flex-wrap-wrap package-reclaim__dropdowns">
                <Dropdown
                  label='Reclaim from'
                  initialText='NHS Bristol'
                  options={reclaimFromOptions}
                  onOptionSelect={(value) => setPackageReclaim({...packageReclaim, from: value})}
                  selectedValue={packageReclaim.from}
                />
                <Dropdown
                  label='Reclaim category'
                  initialText='Category type'
                  options={categoryOptions}
                  onOptionSelect={setSelectedCategory}
                  selectedValue={selectedCategory}
                />
              </div>
              <TextArea classes='package-reclaim__notes' rows={5} label='Add notes' placeholder='My notes here and here' />
              <div className="mt-4 mb-5">
                <RadioButton
                  label=""
                  onChange={changePackageType}
                  options={packageReclaimTypes}
                  selectedValue={packageReclaim.type}
                />
              </div>
              <EuroInput label='Amount' value=' 88888888'/>
              <hr className='horizontal-delimiter' />
              <div className='is-flex is-justify-content-flex-end'>
                <Button onClick={() => alert('Approval')}>Submit for approval</Button>
              </div>
            </div>
          </div>
        }
        <div className='proposed-packages__tabs column'>
          {[{text: 'Approval history', value: 'approvalHistory'},
            {text: 'Package details', value: 'packageDetails'}]
            .map(item => {
              return (
                <div
                  key={item.value}
                  onClick={() => changeTab(item.value)}
                  className={`tab${tab === item.value ? ' active-tab' : ''}`}>
                  <p>{item.text}</p>
                  <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.808608 0L11.1914 0C11.9104 0 12.2704 0.766375 11.762 1.21457L6.57063 5.79162C6.2555 6.06946 5.74452 6.06946 5.42939 5.79162L0.23799 1.21457C-0.270409 0.766375 0.0896673 0 0.808608 0Z" fill="#00664F"/>
                  </svg>
                </div>)})
          }
        </div>
      </div>
      {
        tab === 'approvalHistory' ?
          <ApprovalHistory status='(Ongoing)' history={approvalHistory} />
          : !!summaryData.length &&
          <SummaryDataList
            edit={(item) => console.log('edit', item)}
            remove={(item) => console.log('remove', item)}
            confirmPackage={false}
            slicedText={true}
            summaryData={summaryData}
          />
      }
    </Layout>
  );
};

export default ProposedPackages;

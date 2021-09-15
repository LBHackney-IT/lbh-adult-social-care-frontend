import { Input } from './Input';
import Button from './Button';
import Accordion from './Accordion';
import Announcement from './Announcement';
import BackLink from './BackLink';
import BackToTop from './BackToTop';
import Breadcrumbs from './Breadcrumbs';
import Collapsible from './Collapsible';
import Textarea from './Textarea';
import Checkbox from './Checkbox';
import CookieBanner from './CookieBanner';
import { Tabs } from './Tabs';
import { Tab } from './Tabs/Tab';
import Tag from './Tag';
import Select from './Select';
import Dialog from './Dialog';
import Hint from './lettering/Hint';
import Label from './lettering/Label';
import ErrorMessage from './lettering/ErrorMessage';
import Link from './lettering/Link';
import Timeline from './Timeline';
import Conversation from './Conversation';
import { Table } from './Table';
import { Pagination } from './Pagination';
import SearchBox from './SearchBox';
import RadioItem from './RadioItem';
import { HorizontalSeparator } from './Layout/HorizontalSeparator';
import { Heading } from './lettering/Heading';
import { IndeterminateCheckbox } from './Table/IndeterminateCheckbox';
import Header from './Header';
import InsetText from './InsetText';
import WarningText from './WarningText';
import { SimplePagination } from './SimplePagination';

export const getSlot = (nodeList = [], name) => nodeList.find((el) => el.props.slot === name);

export const getMultipleSlot = (nodeList = [], name) => nodeList.filter((el) => el.props.slot === name);

export {
  RadioItem,
  SimplePagination,
  Conversation,
  Link,
  Timeline,
  ErrorMessage,
  Label,
  Hint,
  Input,
  Button,
  SearchBox,
  Accordion,
  Announcement,
  BackLink,
  BackToTop,
  Breadcrumbs,
  Collapsible,
  Textarea,
  Checkbox,
  CookieBanner,
  Tabs,
  Tab,
  Tag,
  Select,
  Dialog,
  WarningText,
  Pagination,
  Table,
  HorizontalSeparator,
  Heading,
  IndeterminateCheckbox,
  InsetText,
  Header,
};
